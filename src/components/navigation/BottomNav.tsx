import React from 'react';
import './BottomNav.css';

export type Tab = 'groups' | 'assistants' | 'billing' | 'settings';

interface BottomNavProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const Icons = {
    Groups: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Abstract 'Community' / 'Hub' shape: 3 interconnected smooth nodes */}
            <path d="M12 22c4.97 0 9-4.03 9-9 0-4.97-4.03-9-9-9-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9z" opacity="0.2" />
            <circle cx="12" cy="13" r="3" />
            <path d="M12 2a10 10 0 0 0-7.35 16.76" />
            <path d="M19.35 18.76A10 10 0 0 0 12 2" />
        </svg>
    ),
    Assistants: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Futuristic AI spark/star shape */}
            <path d="M12 2L14.4 7.2L20 9L14.4 10.8L12 16L9.6 10.8L4 9L9.6 7.2L12 2Z" />
            <path d="M6 16l1.2 2.6L10 20l-2.8 1.4L6 24l-1.2-2.6L2 20l2.8-1.4L6 16z" />
            <path d="M18 16l1.2 2.6L22 20l-2.8 1.4L18 24l-1.2-2.6L14 20l2.8-1.4L18 16z" />
        </svg>
    ),
    Billing: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Abstract Wallet/Card stack with soft curves */}
            <rect x="2" y="6" width="20" height="12" rx="4" ry="4" />
            <path d="M12 12h4" />
            <path d="M6 6v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" />
        </svg>
    ),
    Settings: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Sleek slider/controls icon instead of generic gear */}
            <path d="M4 8h12" />
            <path d="M4 16h6" />
            <path d="M20 8h-2" />
            <path d="M14 16h6" />
            <circle cx="17" cy="8" r="2" />
            <circle cx="12" cy="16" r="2" />
        </svg>
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
