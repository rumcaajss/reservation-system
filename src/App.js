import React, { useState } from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider, CssBaseline } from '@material-ui/core';
import Navbar from './Components/Navbar';

import AppRouter from './AppRouter';
import { isLoggedIn } from './utils/Auth';

let customizations = {
  palette: {
    primary: {
      main: '#114b5f',
    },
    secondary: {
      main: '#1a936f',
    }
  }
}

let theme = createMuiTheme(customizations);
theme = responsiveFontSizes(theme);

function App() {
  const [loggedIn] = useState(isLoggedIn());
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Navbar loggedIn={loggedIn}/>
      <AppRouter/>
    </ThemeProvider>
  );
}

export default App;
