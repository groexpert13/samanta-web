import React from 'react';
import './Header.css';

interface HeaderProps {
    groupName?: string | null;
    role?: string;
    onSwitchGroup?: () => void;
}

const Header: React.FC<HeaderProps> = ({ groupName, role, onSwitchGroup }) => {
    return (
        <div className="group-header">
            <div className="header-content">
                <div className="group-avatar-placeholder">
                    {groupName ? groupName.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="group-info">
                    {groupName ? (
                        <>
                            <span className="group-name">{groupName}</span>
                            <span className="group-role">{role || 'Admin'}</span>
                        </>
                    ) : (
                        <span className="group-name">Select a Group</span>
                    )}
                </div>
                {onSwitchGroup && (
                    <button className="change-group-btn" onClick={onSwitchGroup}>
                        Switch
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
