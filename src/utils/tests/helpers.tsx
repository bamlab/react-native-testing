import React, {ReactElement} from 'react';
import {render} from 'react-native-testing-library';
import {Provider} from 'react-redux';

import {Toaster} from '../../components/Toaster';
import watchAll from '../../modules/saga';
import {ThemeProvider} from 'styled-components';
import {theme} from '../theme';
import {IAppState} from '../../modules/types';
import {createInitialiasedStore, sagaMiddlewareTest} from './mockStore';
import {storeManager} from '../../modules/storeManager';
import {NavigationScreenProp} from 'react-navigation';
import {createAppContainer} from 'react-navigation';
import {
  createAppContainerWithInitialRoute,
  AppContainer,
} from '../../navigation/stack';

export const renderWithTheme = (page: ReactElement) => {
  return render(<ThemeProvider theme={theme}>{page}</ThemeProvider>);
};

/**
 * If you need to have a wrapper around your page, use it in pageContainerComponent (like the Redux Provider)
 * If you need a component rendered outside your page, do the same
 */
export const renderPage = (
  page: ReactElement,
  initialState?: Partial<IAppState>,
) => {
  storeManager.store = createInitialiasedStore(initialState);
  sagaMiddlewareTest.run(watchAll);

  const pageContainerComponent = (
    <Provider store={storeManager.store}>
      {page}
      <Toaster />
    </Provider>
  );
  const pageRendered = render(pageContainerComponent);
  const refresh = () => pageRendered.rerender(pageContainerComponent);

  return {...pageRendered, refresh};
};

export const getPropsWithNavigation = (
  props?: any,
  navigationPropExtension?: Partial<NavigationScreenProp<{}>>,
) =>
  ({
    ...props,
    navigation: {
      navigate: jest.fn(),
      goBack: jest.fn(),
      ...navigationPropExtension,
    },
  } as any);

export const getMockApiResponse = (status: number, data: any = {}) => ({
  status,
  body: {data},
});

export const renderWithNavigation = (
  pageRoute: string,
  initialState?: IAppState,
) => {
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

  return {...pageRendered, refresh};
};
