import React, {FunctionComponent} from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from '../lib/styled-components';
import {theme} from '../utils/theme';

interface Props extends TouchableOpacityProps {
  title: string;
}

export const Button: FunctionComponent<Props> = ({
  title,
  ...touchableOpacityProps
}) => (
  <FullWidthTouchableOpacity {...touchableOpacityProps}>
    <ButtonContainer>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  </FullWidthTouchableOpacity>
);

const FullWidthTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
`;

const ButtonContainer = styled.View`
  background-color: ${theme.colors.primary};
  border-radius: 6;
  padding-vertical: 10;
  align-items: center;
  color: white;
  margin-vertical: 2;
`;

const ButtonText = styled.Text`
  color: white;
`;
