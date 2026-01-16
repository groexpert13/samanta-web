import { initInitData, initMiniApp } from '@telegram-apps/sdk-react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Initialize the Mini App logic
      try {
        const [miniApp] = initMiniApp();
        miniApp.ready();
      } catch (e) {
         console.warn("Failed to init MiniApp (outside Telegram?)", e);
      }

      // Get init data
      try {
        const [initData] = initInitData();
        if (initData && initData.user) {
          setUsername(initData.user.firstName);
        }
      } catch (e) {
         console.warn("Failed to get InitData (outside Telegram?)", e);
      }
      
    } catch (e) {
      console.error('Telegram SDK Error', e);
    }
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
        <p className="text-gray-400 text-sm">
          {username 
            ? "Welcome back to your AI command center." 
            : "Open this app in Telegram to see your profile."}
        </p>
      </div>
    </div>
  );
}

export default App;
