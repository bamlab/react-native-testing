import { Reducer } from 'redux';

import { TSignUpActionObjectTypes } from './actions';
import { ISignupState } from './types';

export const signupReducer: Reducer<ISignupState, TSignUpActionObjectTypes> = (state = {}) => state;
