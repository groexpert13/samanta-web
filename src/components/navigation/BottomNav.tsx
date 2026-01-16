import React from 'react';
import './BottomNav.css';

export type Tab = 'groups' | 'assistants' | 'billing' | 'settings';

interface BottomNavProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const Icons = {
    Groups: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" ry="1" /><rect width="7" height="5" x="14" y="3" rx="1" ry="1" /><rect width="7" height="9" x="14" y="12" rx="1" ry="1" /><rect width="7" height="5" x="3" y="16" rx="1" ry="1" /></svg>
    ),
    Assistants: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /><line x1="8" x2="16" y1="22" y2="22" /></svg>
    ), // Using Mic/AssistBot icon
    Billing: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
    ),
    Settings: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    )
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="bottom-nav-container">
            <div className="bottom-nav">
                <button
                    className={`nav-item ${activeTab === 'groups' ? 'active' : ''}`}
                    onClick={() => onTabChange('groups')}
                >
                    <Icons.Groups />
                    {activeTab === 'groups' && <span className="nav-label">Groups</span>}
                </button>

                <button
                    className={`nav-item ${activeTab === 'assistants' ? 'active' : ''}`}
                    onClick={() => onTabChange('assistants')}
                >
                    <Icons.Assistants />
                    {activeTab === 'assistants' && <span className="nav-label">Agents</span>}
                </button>

                <button
                    className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}
                    onClick={() => onTabChange('billing')}
                >
                    <Icons.Billing />
                    {activeTab === 'billing' && <span className="nav-label">Billing</span>}
                </button>

                <button
                    className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => onTabChange('settings')}
                >
                    <Icons.Settings />
                    {activeTab === 'settings' && <span className="nav-label">Profile</span>}
                </button>
            </div>
        </div>
    );
};

export default BottomNav;
