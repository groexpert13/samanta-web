import React from 'react';
import './Screens.css';
import { TelegramService } from '../lib/telegram';
import { RefreshCw, HelpCircle } from 'lucide-react';

interface SettingsProps {
    username: string | null;
    dbStatus: string;
    telegramId?: number;
}

const SettingsScreen: React.FC<SettingsProps> = ({ username, dbStatus, telegramId }) => {
    return (
        <div className="screen-container">
            <h2 className="screen-title">Settings</h2>

            <div className="card">
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>User Profile</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Name: {username || 'Loading...'}</p>
                {telegramId && <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>TG ID: {telegramId}</p>}
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Status: {dbStatus}</p>
            </div>

            <div className="card">
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>Appearance</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Theme: System</p>
            </div>
            <div className="card">
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>Actions</h3>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <button
                        onClick={() => TelegramService.sendCommandToBot('refresh')}
                        className="action-button"
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            background: 'var(--tg-theme-button-color, #2481cc)',
                            color: 'var(--tg-theme-button-text-color, #ffffff)',
                            border: 'none',
                            padding: '10px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        <RefreshCw size={18} />
                        Refresh Data
                    </button>
                    <button
                        onClick={() => TelegramService.sendCommandToBot('help')}
                        className="action-button"
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            background: 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
                            color: 'var(--tg-theme-text-color, #000000)',
                            border: 'none',
                            padding: '10px',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        <HelpCircle size={18} />
                        Get Help
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;
