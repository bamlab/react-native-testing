import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';

import { SignUpActionTypes } from './types';

export const SignUpActions = {
  subscribeNewsletter: (email: string) =>
    createAction(SignUpActionTypes.SUBSCRIBE_NEWSLETTER, { email }),
};

export type TSignUpActionObjectTypes = ActionsUnion<typeof SignUpActions>;
