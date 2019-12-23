module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  transform: {
    '^.+\\.(js)$': 'babel-jest',
    '\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/', '<rootDir>/.history/'],
  cacheDirectory: '.jest/cache',
  transformIgnorePatterns: ['node_modules/@bam.tech/react-native-text-input'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  testEnvironment: 'jsdom',
  resetMocks: true,
  projects: ['src/utils/tests/jest.lint.js'],
};
