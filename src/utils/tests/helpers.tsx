import React, { ReactElement } from 'react';
import { render } from 'react-native-testing-library';
import { Provider } from 'react-redux';

import { Toaster } from '../../components/Toaster';
import watchAll from '../../modules/saga';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { IAppState } from '../../modules/types';
import { createInitialiasedStore, sagaMiddlewareTest } from './mockStore';
import { storeManager } from '../../modules/storeManager';

export const renderWithTheme = (page: ReactElement) => {
  return render(<ThemeProvider theme={theme}>{page}</ThemeProvider>);
};

export const renderPage = (page: ReactElement, initialState?: Partial<IAppState>) => {
  storeManager.store = createInitialiasedStore(initialState);
  sagaMiddlewareTest.run(watchAll);

  return renderWithTheme(
    <Provider store={storeManager.store}>
      {page}
      <Toaster />
    </Provider>
  );
};

export const getPropsWithNavigation = (props?: any, navigationPropExtension?: any) =>
  ({
    ...props,
    navigation: {
      navigate: jest.fn(),
      ...navigationPropExtension,
    },
  } as any);

export const getMockApiResponse = (status: number, data: any = {}) => ({ status, body: { data } });
