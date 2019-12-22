import React, { FunctionComponent } from 'react';

import { Button } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { SignUpActions } from '../../modules/signup/actions';
import { Formik } from 'formik';
import { FormikInput } from '../../components/Input';
import { wording } from '../../utils/wording';
import { Card, Container, Title } from '../../components/StyledComponents';
import { NavigationScreenProps } from 'react-navigation';
import { Routes } from '../../navigation/routes';

interface EmailValue {
  email: string;
}

export const Subscription: FunctionComponent<NavigationScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSubmit = ({ email }: EmailValue) => dispatch(SignUpActions.subscribeNewsletter(email));

  const onHome = () => navigation.navigate(Routes.Home);

  return (
    <Container>
      <Card>
        <Title>{wording.subscribe}</Title>
        <Formik
          onSubmit={onSubmit}
          initialValues={{ email: '' }}
          validateOnBlur={false}
          validateOnChange={false}
          render={({ handleSubmit }) => (
            <>
              {/*
              //@ts-ignore */}
              <FormikInput placeholder={wording.emailPlaceholder} name="email" />
              <Button title={wording.validateEmail} onPress={handleSubmit} />
              <Button title={wording.about} onPress={onHome} />
            </>
          )}
        />
      </Card>
    </Container>
  );
};
