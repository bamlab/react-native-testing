import { AppState } from '../types';

import { LoaderName } from './types';

export const isLoadingSelector = (loaderName: LoaderName) => (state: AppState) =>
  state.loading[loaderName];
