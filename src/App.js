import React, { useState, useEffect } from 'react';
import { 
  createMuiTheme, 
  responsiveFontSizes, 
  ThemeProvider, 
  CssBaseline 
} from '@material-ui/core';
import Navbar from './Components/Navbar';
import AppRouter from './AppRouter';
import { AuthService } from './utils/Auth';

let customizations = {
  palette: {
    primary: {
      main: '#114b5f',
    },
    secondary: {
      main: '#47878a',
    }
  }
}

let theme = createMuiTheme(customizations);
theme = responsiveFontSizes(theme);


function App() {
  const [ loggedIn, setLoggedIn ] = useState(true);
  useEffect(()=> {
    AuthService.isAuthed(setLoggedIn);

    if (!loggedIn) {
      AuthService.authenticate(setLoggedIn);
    }
  }, [loggedIn])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Navbar loggedIn={loggedIn}/>
      <AppRouter loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    </ThemeProvider>
  );
}

export default App;
