import { retrieveLaunchParams, mountMiniApp, miniAppReady } from '@telegram-apps/sdk-react';
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
  const [dbStatus, setDbStatus] = useState<string>('Checking DB...');

  // Navigation State
  const [activeTab, setActiveTab] = useState<Tab>('groups');



  useEffect(() => {
    // 1. Init Mini App
    try {
      if (mountMiniApp.isSupported()) {
        mountMiniApp();
        miniAppReady();
        // Request full screen
        if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
          (window as any).Telegram.WebApp.expand();
          (window as any).Telegram.WebApp.disableVerticalSwipes();
        }
      }
    } catch (e) {
      console.warn("MiniApp init failed", e);
    }

    // 2. Get User & Check DB
    const checkUser = async () => {
      let telegramId: number | undefined;
      let firstName: string | undefined;

      try {
        // Use retrieveLaunchParams instead of hooks to avoid crash on non-TG environment
        const lp = retrieveLaunchParams() as any;
        if (lp.initData && lp.initData.user) {
          firstName = lp.initData.user.firstName;
          telegramId = lp.initData.user.id;
          setUsername(firstName || 'User');
        }
      } catch (e) {
        console.warn("LaunchParams failed", e);
        setDbStatus("No Telegram Data (Local Dev?)");
        // For testing locally
        // telegramId = 123456789; 
        return;
      }

      if (telegramId) {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('trial_ends_at')
            .eq('telegram_id', telegramId)
            .single();

          if (error) {
            setDbStatus(`DB Error: ${error.message}`);
          } else if (data) {
            const trialDate = data.trial_ends_at ? new Date(data.trial_ends_at).toLocaleDateString() : 'Active';
            setDbStatus(`Trial until: ${trialDate}`);
          } else {
            setDbStatus("User not found in DB (Start bot first?)");
          }
        } catch (err: any) {
          setDbStatus(`Conn Error: ${err.message}`);
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
        return <SettingsScreen username={username} dbStatus={dbStatus} />;
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
        onTabChange={setActiveTab}
      />
    </div>
  );
}

export default App;
