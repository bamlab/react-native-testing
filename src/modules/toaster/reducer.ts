import { Reducer } from 'redux';
import { IToasterState, ToasterActionTypes } from './types';
import { TToasterActionObjectTypes } from './actions';

const initialState = null;

export const toasterReducer: Reducer<IToasterState | null, TToasterActionObjectTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ToasterActionTypes.ADD_TOAST:
      return action.payload;
    default:
      return state;
  }
};
