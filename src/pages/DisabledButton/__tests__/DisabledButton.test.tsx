import React from 'react';
import { renderPage } from '../../../utils/tests/helpers';
import { DisabledButton } from '../DisabledButton';
import { fireEvent } from 'react-native-testing-library';

describe('[Page] DisabledButton', () => {
  it('renders correctly', () => {
    const page = renderPage(<DisabledButton />);
    expect(page).toMatchSnapshot();
  });

  it('shows disabled confirm button while password is blank', () => {
    const page = renderPage(<DisabledButton />);
    const ConfirmButton = page.getByText('Confirm');
    expect(ConfirmButton).toBeDisabled();
  });

  it('shows success message when password confirmed', () => {
    // Given
    const page = renderPage(<DisabledButton />);
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
