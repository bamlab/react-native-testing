import React, { FunctionComponent } from 'react';
import { TouchableOpacityProps } from 'react-native';
import styled from '../utils/styled-components';
import { theme } from '../utils/theme';

interface Props extends TouchableOpacityProps {
  title: string;
}

export const Button: FunctionComponent<Props> = ({ title, disabled, ...touchableOpacityProps }) => (
  <FullWidthTouchableOpacity {...touchableOpacityProps}>
    <ButtonContainer disabled={disabled}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  </FullWidthTouchableOpacity>
);

const FullWidthTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
`;

const ButtonContainer = styled.View<{ disabled?: boolean }>`
  background-color: ${({ disabled }) => (disabled ? '#ccc' : theme.colors.primary)};
  border-radius: 6;




  padding-vertical: 8;
  align-items: center;
  color: white;
  margin-vertical: 2;
`;

const ButtonText = styled.Text`
  color: white;
`;
