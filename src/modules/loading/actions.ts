import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { LoadingActionTypes, LoaderName } from './types';

export const LoadingActions = {
  showLoader: (loaderName: LoaderName) => createAction(LoadingActionTypes.SHOW_LOADER, loaderName),
  hideLoader: (loaderName: LoaderName) => createAction(LoadingActionTypes.HIDE_LOADER, loaderName),
};

export type TLoadingActionObjectTypes = ActionsUnion<typeof LoadingActions>;
