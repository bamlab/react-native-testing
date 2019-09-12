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
