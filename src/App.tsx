import { retrieveLaunchParams, mountMiniApp, miniAppReady } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import './App.css';

// Components
import BottomNav, { type Tab } from './components/navigation/BottomNav';
import Header from './components/layout/Header';

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

  // Group Context State
  const [currentGroup, setCurrentGroup] = useState<string>('Product Team');
  const [userRole] = useState<string>('Admin');

  useEffect(() => {
    // 1. Init Mini App
    try {
      if (mountMiniApp.isSupported()) {
        mountMiniApp();
        miniAppReady();
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

  const handleSwitchGroup = () => {
    // Mock switching logic for demo
    setCurrentGroup(prev => prev === 'Product Team' ? 'Family Chat' : 'Product Team');
  };

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
      {/* Group-First Header: Always visible */}
      <Header
        groupName={currentGroup}
        role={userRole}
        onSwitchGroup={handleSwitchGroup}
      />

      {/* Main Content Area */}
      <main>
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
