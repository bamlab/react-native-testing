import React, { FunctionComponent } from 'react';

import { Button } from './Button';
import styled from 'styled-components/native';
import { NavigationScreenProps } from 'react-navigation';

interface IProps extends NavigationScreenProps {
  navigationParams?: Record<string, any>;
  route: string;
}

export const ButtonLink: FunctionComponent<IProps> = ({ route, navigation, navigationParams }) => (
  <ButtonWithMargin title={route} onPress={() => navigation.navigate(route, navigationParams)} />
);

const ButtonWithMargin = styled(Button)`
  margin: 16px;
`;
