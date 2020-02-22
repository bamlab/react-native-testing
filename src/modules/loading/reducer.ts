import { Reducer } from 'redux';

import { LoadingState, LoadingActionTypes } from './types';
import { TLoadingActionObjectTypes } from './actions';

export const loadingReducer: Reducer<LoadingState, TLoadingActionObjectTypes> = (
  state = {},
  action
) => {
  switch (action.type) {
    case LoadingActionTypes.SHOW_LOADER:
      return {
        ...state,
        [action.payload]: true,
      };
    case LoadingActionTypes.HIDE_LOADER:
      return {
        ...state,
        [action.payload]: false,
      };
    default:
      return state;
  }
};
