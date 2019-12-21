import React, {useState} from 'react';
import {View} from 'react-native';
import {Button} from '../../components/Button';
import {Input} from '../../components/StyledComponents';
import styled from '../../utils/styled-components';

export const DisabledButton = () => {
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="password"
      />
      <Button disabled={password === ''} title="Confirm" />
    </Container>
  );
};

const Container = styled(View)`
  justify-content: space-around;
  flex-grow: 1;
  padding: 16px;
`;
