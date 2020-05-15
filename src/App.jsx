import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { AuthProvider } from './contexts/auth';
import './App.css';

import Router from './components/Router';
import Signin from './pages/Signin';
import Main from './pages/Main';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      // main: '#3e62ad',
      main: '#f39800',
    },
    secondary: {
      // main: '#a59aca',
      main: '#f8b862',
    },
  },
});

const App = () => {
  return (
    <MuiThemeProvider
      theme={darkTheme}
    >
      <AuthProvider>
        <Router
          renderMain={() => <Main />}
          renderSignin={() => <Signin />}
        />
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
