import React from 'react';
import logo from './logo.svg';
import './App.css';

import { CssBaseline } from '@mui/material';
import { AuthProvider } from './state';
import { AppRouter } from './router';

function App() {
    return (
        <React.Fragment>
            <AuthProvider>
                <CssBaseline />
                <AppRouter />
            </AuthProvider>
        </React.Fragment>
    );
}

export default App;
