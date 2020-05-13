import React from 'react';
import ItemList from './components/ItemList';
import InputForm from './components/InputForm';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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
      <InputForm />
      <ItemList />
    </MuiThemeProvider>
  );
}

export default App;
