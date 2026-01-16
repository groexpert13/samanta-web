import { retrieveLaunchParams, mountMiniApp, miniAppReady } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import './App.css';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<string>('Checking DB...');

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
        // For testing locally, you could hardcode an ID here if needed
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">AI Manager Bot</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        {username ? (
          <p className="text-xl mb-4">Hello, <span className="text-blue-400 font-bold">{username}</span>! 👋</p>
        ) : (
          <p className="text-xl mb-4">Hello! 👋</p>
        )}

        <div className="mt-4 p-3 bg-gray-700 rounded text-sm">
          <p className="text-gray-300 font-semibold">Database Status:</p>
          <p className={`font-mono mt-1 ${dbStatus.startsWith('Trial') ? 'text-green-400' : 'text-yellow-400'}`}>
            {dbStatus}
          </p>
        </div>

        <p className="text-gray-400 text-sm mt-6">
          {username
            ? "Welcome back to your AI command center."
            : "Open this app in Telegram to see your profile."}
        </p>
      </div>
    </div>
  );
}

export default App;
