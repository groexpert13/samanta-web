import React from 'react';
import { hapticFeedback } from '@telegram-apps/sdk-react';
import './BottomNav.css';

export type Tab = 'groups' | 'assistants' | 'billing' | 'settings';

interface BottomNavProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const Icons = {
    Groups: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Nontrivial 'Groups': A stylized molecular connection */}
            <circle cx="12" cy="12" r="3" />
            <circle cx="6" cy="12" r="2" opacity="0.7" />
            <circle cx="18" cy="12" r="2" opacity="0.7" />
            <circle cx="12" cy="6" r="2" opacity="0.7" />
            <circle cx="12" cy="18" r="2" opacity="0.7" />
        </svg>
    ),
    Assistants: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Nontrivial 'AI': A minimalist sparkle/star */}
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
    ),
    Billing: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Nontrivial 'Billing': A diamond/gem shape symbolizing value */}
            <path d="M6 3h12l4 6-10 10L2 9z" />
            <path d="M11 3v6" />
            <path d="M13 3v6" />
        </svg>
    ),
    Settings: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Nontrivial 'Settings': A futuristic nut/hexagon */}
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" opacity="0.5" />
            {/* Wait, that was a star. Let's do a hexagon with a dot */}
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    const handleTabClick = (tab: Tab) => {
        // Trigger Haptic Feedback
        if (hapticFeedback.isSupported()) {
            hapticFeedback.impactOccurred('medium');
        }
        onTabChange(tab);
    };

    return (
        <div className="bottom-nav-container">
            <div className="bottom-nav">
                <button
                    className={`nav-item ${activeTab === 'groups' ? 'active' : ''}`}
                    onClick={() => handleTabClick('groups')}
                    aria-label="Groups"
                >
                    <Icons.Groups />
                </button>

                <button
                    className={`nav-item ${activeTab === 'assistants' ? 'active' : ''}`}
                    onClick={() => handleTabClick('assistants')}
                    aria-label="Assistants"
                >
                    <Icons.Assistants />
                </button>

                <button
                    className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}
                    onClick={() => handleTabClick('billing')}
                    aria-label="Billing"
                >
                    <Icons.Billing />
                </button>

                <button
                    className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => handleTabClick('settings')}
                    aria-label="Settings"
                >
                    <Icons.Settings />
                </button>
            </div>
        </div>
    );
};

export default BottomNav;
