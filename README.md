![BAM](./logo_BAM.png)

# Integration tests with react-native-testing-library

## Table of contents

- [Introduction](#introduction)
- [Theory](#theory)
- [Setup](#setup)
  - [The app](#the-app)
  - [The tests](#the-tests)
- [Debugging](#debugging)
- [Examples](./src/utils/tests/documentation.md#list-of-examples)

## Introduction

This repo contains a list of examples on how to write integration tests with
[react-native-testing-library](https://github.com/callstack/react-native-testing-library).
You can also find in this README some documentation on why integration tests are important and how they can give you more confidence in your code.
I've written an article about why you should use this library and how to use it [here](https://blog.bam.tech/developper-news/how-to-test-your-react-native-app).

## Theory

### What they are

We'll call an integration test a test that:

- Starts by simulating a user interaction
- Ends by expecting a visual feedback
- Is located at page level
- Mocks the native code
- Mocks the external api calls (fetch / graphql...)

### Why they are nice

- These tests don't depend on implementation details
- They test the interaction between the different parts of our app (redux / formik / libs / navigation / components...)
- We won't need to test reducers and sagas separatetely in unit tests

To know more about the philosphy and the reasons behind those tests,
check out those articles written by Kent C Dodds:

- [Testing implementation details](https://kentcdodds.com/blog/testing-implementation-details)
- [Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)
- [Avoid the test user](https://kentcdodds.com/blog/avoid-the-test-user)
- [Why I never use shallow rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)

### When we should write them

We should write an integration test for each new user interaction we add to our app.

### When we should write other types of tests

Because integration tests take a long time to run, you can write lighter tests when it is possible.
When you want to write another type of test you need to make sure:

- there is an integration test covering the input you give to your test
  - that way you make sure you cover regressions if you change the structure of the input or the data given
  - e.g. if you test a logic service, you have tested that the right data is given as arguments everywhere it is called
  - e.g. if you test a saga, you have tested that it is triggered by the action
- there is an integration test covering the output you test

  - that way you make sure you cover regressions if you change the structure of the output or how it is used
  - e.g. if you test a logic service, you have tested its result everywhere it is called
  - e.g. if you test a saga, you have tested that right effects are produced

Typical cases where you can write other types of tests include:

- testing different error handling cases in sagas when you have already tested one
- testing logic inside a logic service - such as a parser or a service that computes a value

### How we do it

We can separate our tests into 4 different parts:

- SETUP --> api calls mocks, page rendering
- GIVEN --> what the user sees on the page
- WHEN --> what the user does
- THEN --> what visual feedback the user should expect

When you want to write a test, you have to ask the questions in the reverse order:

- THEN -> the end result we want to protect with our test
  - e.g. I want a modal to show up, I want to be redirected to another page, I want my snapshot to match, I want an amount to be displayed
- WHEN -> the furthest action you can easily trigger
  - e.g. I click on a button, I enter some text, I dispatch a native event
- GIVEN -> the state of your components and redux store at the beggining of your test
  - e.g. my redux store should have a populated order, my user should be logged in
- SETUP -> the api calls I need to mock and the components you will need to mount
  - e.g. redux provider + theme provider + "My Profile" page

To find out the different api calls that you'll have to mock for your test, you can open up your simulator along with your debugger. Then execute the feature you want to test and check the api calls that occured.

## Setup

### The app

#### Install the app

Clone the repo and then, at its root, run `yarn` or `npm i`

#### Run the app on iOS

At the root of the project:

```bash
cd ios
pod install
cd ..
react-native run-ios
```

#### Run the app on Android

At the root of the project `react-native run-android`

### The tests

#### Configure your own jest environment

If you decide to use react-native-testing-library for your project, don't forget to add those lines to your `jest.config.js`:

```
  setupFiles: ['./src/utils/test.setup.tsx'],
  testEnvironment: 'jsdom',
  resetMocks: true,
```

Setup files will list files to run before each page containing tests. Jsdom is supposed to be the default for a
jest test environment but I found that it was necessary to specify it for some cases.

The `resetMocks: true,` option insures that all jest mocks are reset before tests.
It is independant from react-native-testing-library and should be the default for all apps using jest. It is equivalent of writing in each test:

```typescript
beforeEach(() => {
  jest.resetAllMocks();
});
```

#### Hide unwanted warnings

To hide unwanted warnings, you can override the console.error function (as well as console.log and
console.warn). This is done in the [setup file]("./src/utils/tests/setup.ts") referenced in the [jest config]("./jest.config.js"). Here it is used for
example to hide errors concerning the `act function`, a problem due to React that they fixed in the
version 16.9 but still occurs with react native.

```typescript
export const originalError = console.error;
console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};
```

#### Run the tests

Just run `yarn jest`. You can add `--coverage` to find out how much code the tests cover

## Debugging

- The best way to debug a test is to use your IDE debug features (such as breakpoints). If you use VSCode for example, you can achieve that easily thanks to the jest extension

- Another way to debug your tests is to use the `debug` function given by the `render` method from `react-native-testing-library`. It outputs a snapshot of your component inside your terminal with the current state it is in at the time the debug function is called.

## Test examples

  - [Introduction](./docs/tests.examples.md#introduction)
  - [Theory](./docs/tests.examples.md#theory)
    - [What they are](./docs/tests.examples.md#what-they-are)
    - [Why they are nice](./docs/tests.examples.md#why-they-are-nice)
    - [When we should write them](./docs/tests.examples.md#when-we-should-write-them)
    - [When we should write other types of tests](./docs/tests.examples.md#when-we-should-write-other-types-of-tests)
    - [How we do it](./docs/tests.examples.md#how-we-do-it)
  - [Setup](./docs/tests.examples.md#setup)
    - [The app](./docs/tests.examples.md#the-app)
      - [Install the app](./docs/tests.examples.md#install-the-app)
      - [Run the app on iOS](./docs/tests.examples.md#run-the-app-on-ios)
      - [Run the app on Android](./docs/tests.examples.md#run-the-app-on-android)
    - [The tests](./docs/tests.examples.md#the-tests)
      - [Configure your own jest environment](./docs/tests.examples.md#configure-your-own-jest-environment)
      - [Hide unwanted warnings](./docs/tests.examples.md#hide-unwanted-warnings)
      - [Run the tests](./docs/tests.examples.md#run-the-tests)
  - [Debugging](./docs/tests.examples.md#debugging)
  - [Test examples](./docs/tests.examples.md#test-examples)
