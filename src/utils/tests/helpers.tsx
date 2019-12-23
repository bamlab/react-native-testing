import React, { ReactElement } from 'react';
import { render } from 'react-native-testing-library';
import { Provider } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';

import { Toaster } from '../../components/Toaster';
import watchAll from '../../modules/saga';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { AppState } from '../../modules/types';
import { createInitialiasedStore, sagaMiddlewareTest } from './mockStore';
import { storeManager } from '../../modules/storeManager';
import { createAppContainerWithInitialRoute } from '../../navigation/stack';

/**
 * If you need to have a wrapper around your page, use it in pageContainerComponent (like the Redux Provider)
 * If you need a component rendered outside your page (like a Toaster), do the same
 */
export const renderPage = (page: ReactElement, initialState?: Partial<AppState>) => {
  storeManager.store = createInitialiasedStore(initialState);
  sagaMiddlewareTest.run(watchAll);

  const pageContainerComponent = (
    <ThemeProvider theme={theme}>
      <Provider store={storeManager.store}>
        {page}
        <Toaster />
      </Provider>
    </ThemeProvider>
  );
  const pageRendered = render(pageContainerComponent);
  const refresh = () => pageRendered.rerender(pageContainerComponent);

  return { ...pageRendered, refresh };
};

export const getPropsWithNavigation = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>,
  navigationPropExtension?: Partial<NavigationScreenProp<{}>>
) => ({
  ...props,
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    ...navigationPropExtension,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMockApiResponse = (status: number, data: any = {}) => ({
  status,
  body: { data },
});

export const renderWithNavigation = (pageRoute: string, initialState?: AppState) => {
  const App = createAppContainerWithInitialRoute(pageRoute);
  storeManager.store = createInitialiasedStore(initialState);
  sagaMiddlewareTest.run(watchAll);

  const pageContainerComponent = (
    <Provider store={storeManager.store}>
      <App />
      <Toaster />
    </Provider>
  );
  const pageRendered = render(pageContainerComponent);
  const refresh = () => pageRendered.rerender(pageContainerComponent);

  return { ...pageRendered, refresh };
};
