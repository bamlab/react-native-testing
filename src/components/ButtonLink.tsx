import React, { FunctionComponent } from 'react';

import { Button } from './Button';
import styled from 'styled-components/native';
import { NavigationScreenProps } from 'react-navigation';

interface Props extends NavigationScreenProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigationParams?: Record<string, any>;
  route: string;
}

export const ButtonLink: FunctionComponent<Props> = ({ route, navigation, navigationParams }) => (
  <ButtonWithMargin title={route} onPress={() => navigation.navigate(route, navigationParams)} />
);

const ButtonWithMargin = styled(Button)`
  margin: 16px;
`;
