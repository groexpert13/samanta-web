import React from 'react';
import './Screens.css';

const BillingScreen: React.FC = () => {
    return (
        <div className="screen-container">
            <h2 className="screen-title">Billing</h2>
            <div className="card">
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>Current Plan</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Pro Plan - $9.99/mo</p>
            </div>
            <button style={{
                width: '100%',
                padding: '12px',
                background: 'var(--tg-theme-button-color, #3390ec)',
                color: 'var(--tg-theme-button-text-color, #ffffff)',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600'
            }}>
                Manage Subscription
            </button>
        </div>
    );
};

export default BillingScreen;
