import React from 'react';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
    return (
        <div className="splash-container">
            <div className="logo-wrapper">
                <img
                    src="/samanta.png"
                    alt="Samanta"
                    className="splash-logo"
                />
                <div className="logo-shadow"></div>
            </div>
            <div className="loading-text">Завантаження Саманти</div>
        </div>
    );
};

export default SplashScreen;
