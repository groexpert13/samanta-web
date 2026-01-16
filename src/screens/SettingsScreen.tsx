import React from 'react';
import './Screens.css';

interface SettingsProps {
    username: string | null;
    dbStatus: string;
}

const SettingsScreen: React.FC<SettingsProps> = ({ username, dbStatus }) => {
    return (
        <div className="screen-container">
            <h2 className="screen-title">Settings</h2>

            <div className="card">
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>User Profile</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Name: {username || 'Loading...'}</p>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Status: {dbStatus}</p>
            </div>

            <div className="card">
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>Appearance</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Theme: System</p>
            </div>
            <div className="card">
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>Notifications</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Enabled</p>
            </div>
        </div>
    );
};

export default SettingsScreen;
