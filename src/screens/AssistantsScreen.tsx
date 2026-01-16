import React from 'react';
import './Screens.css';

const AssistantsScreen: React.FC = () => {
    return (
        <div className="screen-container">
            <h2 className="screen-title">Assistants</h2>
            <div className="card">
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>Summarizer</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Compiles daily digests of chat activity.</p>
            </div>
            <div className="card">
                <h3 style={{ margin: 0, marginBottom: 8, fontSize: '18px' }}>Task Manager</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>Extracts tasks from conversations.</p>
            </div>
        </div>
    );
};

export default AssistantsScreen;
