import fetchMock from 'fetch-mock';

/**
 * Suppress React 16.8 act() warnings globally.
 * Waiting for react-native to support react 16.9
 */
const originalConsoleError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalConsoleError.call(console, ...args);
};

/**
 * Override console.warn to hide unwanted warnings
 */
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  const warningMessage = args[0];
  const warningsToHide = [
    'Calling .measureInWindow()',
    'Calling .measureLayout()',
    'Calling .setNativeProps()',
    'Calling .focus()',
    'Calling .blur()',
  ];

  const shouldPrintWarning = warningsToHide.reduce(
    (shouldPrintWarning, warningToHide) =>
      shouldPrintWarning && !warningMessage.includes(warningToHide),
    true,
  );
  if (shouldPrintWarning) {
    originalConsoleWarn(...args);
  }
};

/**
 * Mock react-native-gesture-handler to render react navigation components and their animations
 */
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    State: {},
    PanGestureHandler: View,
    BaseButton: View,
    Directions: {},
  };
});
