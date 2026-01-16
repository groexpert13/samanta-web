import React from 'react';
import './Screens.css';

const GroupsScreen: React.FC = () => {
    return (
        <div className="screen-container">
            <h2 className="screen-title">My Groups</h2>

            <div className="card">
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>Product Team</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Connected • Active</p>
            </div>

            <div className="card">
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>Marketing</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Connected • Active</p>
            </div>

            <div className="card" style={{ opacity: 0.5 }}>
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>Family Chat</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Disconnected</p>
            </div>
        </div>
    );
};

export default GroupsScreen;
