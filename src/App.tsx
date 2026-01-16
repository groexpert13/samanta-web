import { retrieveLaunchParams, mountMiniApp, miniAppReady } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import './App.css';

// Components
import BottomNav, { type Tab } from './components/navigation/BottomNav';
import SplashScreen from './components/common/SplashScreen';
import Header from './components/navigation/Header';

// Screens
import GroupsScreen from './screens/GroupsScreen';
import AssistantsScreen from './screens/AssistantsScreen';
import BillingScreen from './screens/BillingScreen';
import SettingsScreen from './screens/SettingsScreen';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<string>('Checking DB...');
  const [isLoading, setIsLoading] = useState(true);

  // Navigation State
  const [activeTab, setActiveTab] = useState<Tab>('groups');

  useEffect(() => {
    // 1. Init Mini App
    try {
      if (mountMiniApp.isSupported()) {
        mountMiniApp();
        miniAppReady();
        // Request full screen & consistent branding
        if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
          const tg = (window as any).Telegram.WebApp;
          tg.expand();
          tg.disableVerticalSwipes();
          // Match Milky White background
          tg.setHeaderColor('#FAFAF9');
          tg.setBackgroundColor('#FAFAF9');
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
          setUserPhoto(lp.initData.user.photoUrl || null);
        }
      } catch (e) {
        console.warn("LaunchParams failed", e);
        setDbStatus("No Telegram Data (Local Dev?)");
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

      // Minimum loading time for aesthetic purposes if needed, 
      // but usually the DB check is enough.
      setIsLoading(false);
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

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="app-container">
      <Header firstName={username} photoUrl={userPhoto} />

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
