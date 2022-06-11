import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/analytics';
// Providers
import { AuthProvider } from './contexts/AuthContext';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
// Styles
import theme from './theme';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
//Components
import HomePage from './pages/homepage.component';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const snackbarStyles = makeStyles((theme) => ({
  success: { color: 'white' },
  error: { color: 'white' },
  warning: { color: 'white' },
  info: { color: 'white' },
}));

const App = () => {
  const classes = snackbarStyles();
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <SnackbarProvider
            classes={{
              variantSuccess: classes.success,
              variantError: classes.error,
              variantWarning: classes.warning,
              variantInfo: classes.info,
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={3000}>
            <div data-testid='appContainer' className='App'>
              <HomePage />
            </div>
          </SnackbarProvider>
        </AuthProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
