import React from 'react';
import { renderPage, getPropsWithNavigation } from '../../../utils/tests/helpers';
import { DisabledButton } from '../DisabledButton';
import { fireEvent } from 'react-native-testing-library';

describe('[Page] DisabledButton', () => {
  const props = getPropsWithNavigation();

  it('shows disabled confirm button while password is blank', () => {
    const page = renderPage(<DisabledButton {...props} />);
    const ConfirmButton = page.getByText('Confirm');
    expect(ConfirmButton).toBeDisabled();
  });

  it('shows success message when password confirmed', () => {
    // Given
    const page = renderPage(<DisabledButton {...props} />);
    const PasswordInput = page.getByPlaceholder('password');
    const ConfirmButton = page.getByText('Confirm');
    // When
    fireEvent.changeText(PasswordInput, 'azertyuiop123');
    expect(ConfirmButton).toBeEnabled();
    fireEvent.press(ConfirmButton);
    // Then
    const SuccessMessage = page.queryByText('Password confirmed');
    expect(SuccessMessage).toBeDefined();
  });
});
