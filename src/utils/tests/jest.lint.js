import path from 'path';

module.exports = {
  rootDir: path.join(__dirname, '..'),
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: ['src/**/*.(js|ts|tsx)'],
  maxWarnings: 0,
};
