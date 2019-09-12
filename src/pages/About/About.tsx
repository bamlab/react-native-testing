import React, { FunctionComponent } from 'react';
import { Button } from '../../components/Button';
import { wording } from '../../utils/wording';
import { Container, Card, Title, Input } from '../../components/StyledComponents';
import { NavigationScreenProps } from 'react-navigation';
import { Routes } from '../../navigation/routes';
import { Text } from 'react-native';

export const About: FunctionComponent<NavigationScreenProps> = ({ navigation }) => (
  <Container>
    <Card>
      <Title>{wording.aboutTitle}</Title>
      <Text>The best way to know more about it is to subscribe ;)</Text>
      <Button title={wording.subscribe} onPress={() => navigation.navigate(Routes.Home)} />
    </Card>
  </Container>
);
