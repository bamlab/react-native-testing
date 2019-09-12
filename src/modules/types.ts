import { ISignupState } from './signup/types';
import { IToasterState } from './toaster/types';

export interface IAppState {
  signup: ISignupState;
  toaster: IToasterState;
}
