import React from 'react';
import { fireEvent } from 'react-native-testing-library';
import 'jest-styled-components';

import { renderPage, getPropsWithNavigation } from '../../../utils/tests/helpers';
import { wording } from '../../../utils/wording';
import { About } from '../About';

describe('[Page] About', () => {
  const props = getPropsWithNavigation();

  it('should navigate to home page on subscribe button press', () => {
    // SETUP
    const page = renderPage(<About {...props} />);
    // GIVEN
    const NavigateSubscribeButton = page.getByText(wording.subscribe);
    // WHEN
    fireEvent.press(NavigateSubscribeButton);
    // THEN
    expect(props.navigation.navigate).toBeTruthy();
  });
});
