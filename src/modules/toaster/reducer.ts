import { Reducer } from 'redux';
import { ToasterState, ToasterActionTypes } from './types';
import { TToasterActionObjectTypes } from './actions';

const initialState = null;

export const toasterReducer: Reducer<ToasterState | null, TToasterActionObjectTypes> = (
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
