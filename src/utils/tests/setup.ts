/**
 * Suppress React 16.8 act() warnings globally.
 * Waiting for react-native to support react 16.9
 */
export const originalError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};

console.warn = arg => {
  const warnings = [
    'Calling .measureInWindow()',
    'Calling .measureLayout()',
    'Calling .setNativeProps()',
    'Calling .focus()',
    'Calling .blur()',
  ];

  const finalArgs = warnings.reduce(
    (acc, curr) => (arg.includes(curr) ? [...acc, arg] : acc),
    [],
  );

  if (!finalArgs.length) {
    console.warn(arg);
  }
};

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    State: {},
    PanGestureHandler: View,
    BaseButton: View,
    Directions: {},
  };
});
