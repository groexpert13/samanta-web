import React from 'react';
import { hapticFeedback } from '@telegram-apps/sdk-react';
import { LayoutGrid, Wallet, Settings2 } from 'lucide-react';
import './BottomNav.css';

export type Tab = 'groups' | 'assistants' | 'billing' | 'settings';

interface BottomNavProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    const handleTabClick = (tab: Tab) => {
        if (activeTab === tab) return;

        // Trigger Haptic Feedback for selection change
        if (hapticFeedback.isSupported()) {
            hapticFeedback.impactOccurred('light');
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
                    <LayoutGrid size={28} strokeWidth={1.8} />
                </button>

                <button
                    className={`nav-item ${activeTab === 'assistants' ? 'active' : ''}`}
                    onClick={() => handleTabClick('assistants')}
                    aria-label="Assistants"
                >
                    <img src="/samanta.png" alt="Assistants" className="nav-icon-img" />
                </button>

                <button
                    className={`nav-item ${activeTab === 'billing' ? 'active' : ''}`}
                    onClick={() => handleTabClick('billing')}
                    aria-label="Billing"
                >
                    <Wallet size={28} strokeWidth={1.8} />
                </button>

                <button
                    className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => handleTabClick('settings')}
                    aria-label="Settings"
                >
                    <Settings2 size={28} strokeWidth={1.8} />
                </button>
            </div>
        </div>
    );
};

export default BottomNav;
