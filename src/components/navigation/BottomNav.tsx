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
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {/* Nontrivial 'Groups': Concentric interconnected nodes symbolizing a hub/workspace */}
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2" opacity="0.5" />
            <path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41" opacity="0.5" />
            <path d="M12 7a5 5 0 0 0-5 5" />
            <path d="M17 12a5 5 0 0 1-5 5" />
        </svg>
    ),
    Assistants: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {/* Nontrivial 'AI': A complex sparkle with internal nodes suggesting intelligence */}
            <path d="M12 3a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1Z" />
            <path d="M12 18a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1Z" />
            <path d="M3 12a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1Z" />
            <path d="M18 12a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1Z" />
            <path d="M5.636 5.636a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 0 1-1.414 1.414L5.636 7.05a1 1 0 0 1 0-1.414Z" />
            <path d="M15.536 15.536a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414Z" />
            <path d="M5.636 18.364a1 1 0 0 1 0-1.414l1.414-1.414a1 1 0 1 1 1.414 1.414l-1.414 1.414a1 1 0 0 1-1.414 0Z" />
            <path d="M18.364 5.636a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    Billing: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {/* Nontrivial 'Billing': A card stack with a stylized wave indicating currency flow */}
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
            <path d="M7 15h.01" />
            <path d="M11 15h2" />
        </svg>
    ),
    Settings: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {/* Nontrivial 'Settings': Control sliders integrated into a squircle structure */}
            <path d="M3 12h18" opacity="0.3" />
            <circle cx="8" cy="12" r="2.5" />
            <circle cx="16" cy="12" r="2.5" fill="currentColor" fillOpacity="0.2" />
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" opacity="0.4" />
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
