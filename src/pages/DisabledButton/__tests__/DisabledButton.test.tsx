import React from 'react';
import {renderPage, getPropsWithNavigation} from '../../../utils/tests/helpers';
import {DisabledButton} from '../DisabledButton';

describe('[Page] DisabledButton', () => {
  it('shows disabled confirm button while password is blank', () => {
    const props = getPropsWithNavigation();

    const page = renderPage(<DisabledButton {...props} />);
    const ConfirmButton = page.getByText(/confirm/i);
    expect(ConfirmButton).toBeDisabled();
  });
});
