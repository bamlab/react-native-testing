import React from 'react';
import { fireEvent, waitForElement } from 'react-native-testing-library';
import fetchMock from 'fetch-mock';
import 'jest-styled-components';

import { Subscription } from '../Subscription';
import { renderPage, getPropsWithNavigation } from '../../../utils/tests/helpers';
import { EMAIL_API_ENDPOINT } from '../../../api/config';
import { wording } from '../../../utils/wording';

describe('[Page] Home', () => {
  const props = getPropsWithNavigation();
  const mockCallSubscribe = (status: number) => {
    fetchMock.post(EMAIL_API_ENDPOINT, status);
  };

  beforeEach(() => {
    fetchMock.reset();
  });

  it('should display succesful message on successful subscription', async () => {
    // SETUP
    mockCallSubscribe(200);
    const page = renderPage(<Subscription {...props} />);
    // GIVEN
    const EmailInput = page.getByPlaceholder(wording.emailPlaceholder);
    const ValidateButton = page.getByText(wording.validateEmail);
    // Careful, getByPlaceholder might not work depending on the input you use.
    // I don't think it works with react-native-paper for instance
    // WHEN
    fireEvent.changeText(EmailInput, 'hello@bam.com');
    fireEvent.press(ValidateButton);
    // THEN
    const SuccessMessage = await waitForElement(() =>
      page.queryByText(wording.subscriptionSuccessful)
    );
    expect(SuccessMessage).toBeDefined();
  });

  it('should display error message on failed subscription', async () => {
    // SETUP
    mockCallSubscribe(400);
    const page = renderPage(<Subscription {...props} />);
    // GIVEN
    const EmailInput = page.getByPlaceholder(wording.emailPlaceholder);
    const ValidateButton = page.getByText(wording.validateEmail);
    // WHEN
    fireEvent.changeText(EmailInput, 'hello@bamom');
    fireEvent.press(ValidateButton);
    // THEN
    const ErrorMessage = await waitForElement(() => page.queryByText(wording.basicError));
    expect(ErrorMessage).toBeDefined();
  });
});
