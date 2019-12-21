import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';

import { store } from './modules/store';
import { Toaster } from './components/Toaster';
import { AppContainer } from './navigation/stack';
import { theme } from './utils/theme';

export const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AppContainer />
      <Toaster />
    </Provider>
  </ThemeProvider>
);
