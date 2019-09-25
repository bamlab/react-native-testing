import React, {FunctionComponent} from 'react';

import {useDispatch} from 'react-redux';
import {SignUpActions} from '../../modules/signup/actions';
import {wording} from '../../utils/wording';
import {Card, Container, Title} from '../../components/StyledComponents';
import {NavigationScreenProps} from 'react-navigation';
import {Routes} from '../../navigation/routes';
import {ButtonLink} from '../../components/ButtonLink';

export const Home: FunctionComponent<NavigationScreenProps> = ({
  navigation,
}) => {
  const routesToDisplay = [Routes.About, Routes.Subscription];

  return (
    <Container>
      <Card>
        {routesToDisplay.map(route => (
          <ButtonLink navigation={navigation} route={route} />
        ))}
      </Card>
    </Container>
  );
};
