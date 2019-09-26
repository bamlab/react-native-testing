import {IAppState} from '../types';

import {LoaderName} from './types';

export const isLoadingSelector = (loaderName: LoaderName) => (
  state: IAppState,
) => state.loading[loaderName];
