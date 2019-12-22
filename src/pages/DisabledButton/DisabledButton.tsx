import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/StyledComponents';
import styled from '../../utils/styled-components';

export const DisabledButton = () => {
  const [password, setPassword] = useState('');
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  const onConfirm = () => setIsPasswordConfirmed(true);

  return (
    <Container>
      <Input value={password} onChangeText={setPassword} placeholder="password" />
      <Button title="Confirm" onPress={onConfirm} />
      {isPasswordConfirmed && <Text>Password confirmed</Text>}
    </Container>
  );
};

const Container = styled(View)`
  justify-content: space-around;
  flex-grow: 1;
  padding: 16px;
`;
