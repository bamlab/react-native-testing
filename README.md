![BAM](./logo_BAM.png)

# Integration tests with react-native-testing-library

## Table of contents

- [Introduction](#introduction)
- [Theory](#theory)
- [Setup](#setup)
- [Examples](#examples)

## Introduction

This repo contains a list of examples on how to write integration tests with
[react-native-testing-library](https://github.com/callstack/react-native-testing-library).
You can also find in this README some documentation on why integration tests are important and how they can give
you more confidence in your tests.

## Theory

### What are they ?

We'll call an integration test a test that :

- Starts by simulating a user interaction
- Ends by expecting a visual feedback
- Is located at page level
- Mocks the native code
- Mocks the external api calls (fetch / graphql...)

### Why are they nice ?

- These tests don't depend on implementation details
- They test the interaction between the different parts of our app (redux / formik / libs / navigation / components...)
- We won't need to test reducers and sagas separatetely in unit tests

To know more about the philosphy and the reasons behind those tests,
check out those articles written by Kent C Dodds :

- [Testing implementation details](https://kentcdodds.com/blog/testing-implementation-details)
- [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
- [Avoid the test user](https://kentcdodds.com/blog/avoid-the-test-user)
- [Why I never use shallow rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)

### When should we write them ?

We should write an integration test for each new user interaction we add to our app

### How do we do it ?

- First, find out the different api calls that you'll have to mock for your test.
  To do that, open up your simulator along with your debugger. Then execute the feature you want to test and check the api calls that occured.
- Then find out how to organise your mock data
- Finally write your tests following the model
  - SETUP --> mock api calls, render page
  - GIVEN --> what the user sees on the page
  - WHEN --> what the user does
  - THEN --> what visual feedback the user should expect

## Setup

### Install the app

Clone the repo and then, at its root, run
`yarn`
or
`npm i`

### Run the app

#### On iOS

At the root of the project :

```
cd ios
pod install
cd ..
react-native run-ios
```

#### On Android

At the root of the project :

```
react-native run-android
```

### Run the tests

Just run `yarn jest`. You can add `--coverage` to find out how much code the tests cover

### Configure your own jest environment

If you decide to use react-native-testing-library for your project, don't forget to add those lines to your `jest.config.js`:

```
  setupFiles: ['./src/utils/test.setup.tsx'],
  testEnvironment: 'jsdom',
```

Setup files will list files to run before each page containing tests. Jsdom is supposed to be the default for a
jest test environment but I found that it was necessary to specify it for some cases.

## Examples

You can find below example code on how to test features with :

- [Redux store](./src/pages/TodoList/__tests__/TodoList.test.tsx)
  - check also [renderPage method](./src/utils/tests/helpers.tsx)
- [Redux saga](./src/pages/Subscription/__tests__/Subscription.test.tsx)
- [Formik](./src/pages/Subscription/__tests__/Subscription.test.tsx)
- [Inputs](./src/pages/Subscription/__tests__/Subscription.test.tsx)
  - Careful, getByPlaceholder might not work depending on the input you use. I don't think it works with react-native-paper for instance
- External api calls
  - [simple](./src/pages/Subscription/__tests__/Subscription.test.tsx)
  - [with response](./src/pages/Movies/__tests__/Movies.test.tsx)
  - **with query parameters and tokens to check** -> TODO
- [Styled-components (or any styling library)](./src/pages/Subscription/__tests__/Subscription.test.tsx)
  - check [renderWithTheme method](./src/utils/tests/helpers.tsx), don't forget to import `jest-styled-components` in each test file. WARNING : not working yet with theme provider !!
- [Components outside your page](./src/pages/Subscription/__tests__/Subscription.test.tsx)
  - check [renderPage method](./src/utils/tests/helpers.tsx) with the Toaster
- [Timers (delay, setTimeout...)](./src/pages/Movies/__tests__/Movies.test.tsx)
- [Loading](./src/pages/Movies/**tests**/Movies.test.tsx)
- Navigation
  - [Internal navigation](./src/pages/About/__tests__/About.test.tsx)
    - currently looking for a better solution that would wrap the page with its real stack navigator
  - **external navigation** -> TODO: navigation from saga with navigateService
  - **asynchronous navigation** -> TODO: using flushMicrotasksQueue
- **Scroll view** -> TODO: see Antoine J.
- **Native code** -> TODO: by mocking the native code
