import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App  from './App';
import '@radix-ui/themes/styles.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Theme } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <Theme appearance="dark">
                <App/>
            </Theme>
        </Router>
    </React.StrictMode>
);
