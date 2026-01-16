import React from 'react';
import './Header.css';

interface HeaderProps {
    firstName: string | null;
    photoUrl: string | null;
}

const Header: React.FC<HeaderProps> = ({ firstName, photoUrl }) => {
    return (
        <header className="app-header">
            <div className="user-info">
                {photoUrl ? (
                    <img src={photoUrl} alt="User" className="user-avatar" />
                ) : (
                    <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', color: '#78716c' }}>
                        {firstName?.charAt(0) || 'U'}
                    </div>
                )}
                <div className="greeting-container">
                    <span className="greeting-text">Привіт, {firstName || 'Друже'}</span>
                </div>
            </div>
            <img src="/samanta.png" alt="Samanta Logo" className="app-logo-small" />
        </header>
    );
};

export default Header;
