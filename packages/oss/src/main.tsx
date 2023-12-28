import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App  from './App';
import '@radix-ui/themes/styles.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Theme } from '@radix-ui/themes';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router>
            <Theme appearance="dark">
                <QueryClientProvider client={queryClient}>
                <App/>
                </QueryClientProvider>
            </Theme>
        </Router>
    </React.StrictMode>
);
