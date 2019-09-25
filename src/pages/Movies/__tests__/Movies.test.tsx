import React from 'react';
import {renderPage} from '../../../utils/tests/helpers';
import {Movies} from '../Movies';
import {waitForElement} from 'react-native-testing-library';

describe('[Page] Movies', () => {
  it('should load movies and display movies properly', () => {
    jest.useFakeTimers();
    const page = renderPage(<Movies />);
    const Loader = page.queryByTestId('loader');
    expect(Loader).toBeDefined();
    jest.runOnlyPendingTimers(); // don't run all timers here because delay (the redux saga effect) use recursive timers
    const FirstMovie = waitForElement(() => page.queryByText('Star Wars'));
    expect(FirstMovie).toBeDefined();
  });
});
