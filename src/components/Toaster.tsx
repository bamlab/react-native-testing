import React, { FunctionComponent } from 'react';
//@ts-ignore
import ToasterMessage from 'react-native-toaster';
import { useSelector } from 'react-redux';

import { toasterMessageSelector } from '../modules/toaster/selectors';

export const Toaster: FunctionComponent<{}> = () => {
  const toasterMessage = useSelector(toasterMessageSelector);

  return <ToasterMessage message={toasterMessage} />;
};
