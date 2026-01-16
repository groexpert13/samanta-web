import { retrieveLaunchParams, mountMiniApp, miniAppReady, init, viewport, requestFullscreen, hapticFeedback } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import './App.css';

// Components
import BottomNav, { type Tab } from './components/navigation/BottomNav';

// Screens
import GroupsScreen from './screens/GroupsScreen';
import AssistantsScreen from './screens/AssistantsScreen';
import BillingScreen from './screens/BillingScreen';
import SettingsScreen from './screens/SettingsScreen';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<number | undefined>(undefined);
  const [dbStatus, setDbStatus] = useState<string>('Checking DB...');
  const [debugInfo, setDebugInfo] = useState<string>('Initializing...');

  // Navigation State
  const [activeTab, setActiveTab] = useState<Tab>('groups');



  useEffect(() => {
    // 0. Initialize SDK
    try {
      init();
      setDebugInfo(prev => prev + "\nSDK Init Success");
    } catch (e: any) {
      console.warn("SDK init failed", e);
      setDebugInfo(prev => prev + `\nSDK Init Fail: ${e.message}`);
    }

    const initViewport = async () => {
      try {
        if (viewport.mount.isAvailable()) {
          await viewport.mount();
          viewport.expand();
          setDebugInfo(prev => prev + "\nViewport Mounted & Expanded");

          if (requestFullscreen.isAvailable()) {
            requestFullscreen();
            setDebugInfo(prev => prev + "\nFullscreen Requested");
          }
        }
      } catch (e: any) {
        console.warn("Viewport/Fullscreen init failed", e);
        setDebugInfo(prev => prev + `\nViewport/Full Error: ${e.message}`);
      }
    };

    initViewport();

    // 1. Init Mini App
    try {
      if (mountMiniApp.isSupported()) {
        mountMiniApp();
        miniAppReady();
        setDebugInfo(prev => prev + "\nMiniApp Ready");

        // Legacy support if needed
        if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
          (window as any).Telegram.WebApp.expand();
        }
      }
    } catch (e: any) {
      console.warn("MiniApp init failed", e);
      setDebugInfo(prev => prev + `\nMiniApp Error: ${e.message}`);
    }

    // 2. Get User & Check DB
    const checkUser = async () => {
      let tid: number | undefined;
      let fname: string | undefined;

      try {
        let lp: any;
        try {
          lp = retrieveLaunchParams();
          setDebugInfo(prev => prev + `\nPlatform: ${lp.platform}`);
        } catch (e: any) {
          setDebugInfo(prev => prev + `\nLP Catch: ${e.message.substring(0, 20)}`);
        }

        // Try to get data from LP or Fallback to window object
        const initData = lp?.initData || (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.initDataUnsafe);

        if (initData) {
          setDebugInfo(prev => prev + "\nData Found");
          const user = initData.user;
          if (user) {
            fname = user.firstName;
            tid = user.id;
            setUsername(fname || 'User');
            setTelegramId(tid);
            setDebugInfo(prev => prev + `\nUID: ${tid}`);
          } else {
            setDebugInfo(prev => prev + "\nUser Missing in Data");
          }
        } else {
          setDebugInfo(prev => prev + "\nNo InitData (Not in TG?)");
          setDebugInfo(prev => prev + `\nHref: ${window.location.href.substring(0, 30)}...`);
        }
      } catch (e: any) {
        console.warn("User extraction failed", e);
        setDebugInfo(prev => prev + `\nErr: ${e.message}`);
        setDbStatus("No Telegram Data");
        return;
      }

      if (tid) {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('trial_ends_at')
            .eq('telegram_id', tid)
            .single();

          if (error) {
            setDbStatus(`DB Error: ${error.message}`);
            setDebugInfo(prev => prev + `\nDB Query Error: ${error.message}`);
          } else if (data) {
            const trialDate = data.trial_ends_at ? new Date(data.trial_ends_at).toLocaleDateString() : 'Active';
            setDbStatus(`Trial until: ${trialDate}`);
            setDebugInfo(prev => prev + "\nDB User Found");
          } else {
            setDbStatus("User not in DB");
            setDebugInfo(prev => prev + "\nDB User Not Found");
          }
        } catch (err: any) {
          setDbStatus(`Conn Error: ${err.message}`);
          setDebugInfo(prev => prev + `\nConn Error: ${err.message}`);
        }
      }
    };

    checkUser();
  }, []);


  // Screen Rendering Logic
  const renderScreen = () => {
    switch (activeTab) {
      case 'groups':
        return <GroupsScreen />;
      case 'assistants':
        return <AssistantsScreen />;
      case 'billing':
        return <BillingScreen />;
      case 'settings':
        return <SettingsScreen username={username} dbStatus={dbStatus} telegramId={telegramId} debugInfo={debugInfo} />;
      default:
        return <GroupsScreen />;
    }
  };

  return (
    <div className="app-container">
      {/* Main Content Area - Full Screen */}
      <main className="main-content">
        {renderScreen()}
      </main>

      {/* Floating Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          try {
            if (hapticFeedback.impactOccurred.isAvailable()) {
              hapticFeedback.impactOccurred('light');
            }
          } catch (e) {
            console.warn('Haptics failed', e);
          }
        }}
      />
    </div>
  );
}

export default App;
