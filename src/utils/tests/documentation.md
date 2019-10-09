# Documentation for integration tests

## Table of contents

- Data flow

  - [Redux store](#using-a-redux-store)
  - [Redux saga](#using-redux-saga)

- External api calls

  - [simple](./src/pages/Subscription/__tests__/Subscription.test.tsx)
  - [with response](./src/pages/Movies/__tests__/Movies.test.tsx)
  - **with query parameters and tokens to check**

- User interactions

  - [Formik](./src/pages/Subscription/__tests__/Subscription.test.tsx)
  - [Inputs](./src/pages/Subscription/__tests__/Subscription.test.tsx)
  - **Scroll view**
  - **Native code**

* [Styled-components (or any styling library)](./src/pages/Subscription/__tests__/Subscription.test.tsx)
* [Components outside your page](./src/pages/Subscription/__tests__/Subscription.test.tsx)
* [Timers (delay, setTimeout...)](./src/pages/Movies/__tests__/Movies.test.tsx)
* [Loading](./src/pages/Movies/**tests**/Movies.test.tsx)
* Navigation
  - [Internal navigation](./src/pages/About/__tests__/About.test.tsx)
  - **external navigation**
  - **asynchronous navigation**

## Data flow

### Using a redux store

Check out:

- [this test](./src/pages/TodoList/__tests__/TodoList.test.tsx)
- [renderPage method](./src/utils/tests/helpers.tsx)

### Using redux saga

Check out:

- [this test](./src/pages/Subscription/__tests__/Subscription.test.tsx)
- [renderPage method](./src/utils/tests/helpers.tsx)

## External api calls with fetch / wretch

To make our integration tests cover as much code as possible, we use [fetch-mock](https://github.com/wheresrhys/fetch-mock) to mock the api calls. That way, we can test that our api calls to our server are actually made and have the right parameters.

- [simple call](./src/pages/Subscription/__tests__/Subscription.test.tsx)
- [with response](./src/pages/Movies/__tests__/Movies.test.tsx)
- **TODO:** with query parameters and tokens to check

## Navigation

### Internal navigation

Check out:

- [this test](./src/pages/About/__tests__/About.test.tsx)
- the helper `getPropsWithNavigation` in the [helpers](./src/utils/tests/helpers.ts)

I am currently looking for a better solution that would wrap the page with its real stack navigator

### External navigation

TODO: Navigation from saga with navigateService

### Asynchronous navigation

TODO: Using flushMicrotasksQueue

## Using a styling library

Check [renderWithTheme method](./src/utils/tests/helpers.tsx), don't forget to import `jest-styled-components` in each test file.

WARNING : not working yet with theme provider !!

## Using inputs

Careful, getByPlaceholder might not work depending on the input you use.
I don't think it works with react-native-paper for instance

## Scroll View

TODO: see Antoine Jubin

## Native code

TODO: By mocking the proper native library with jest

## Using components outside your page

Check out:

- [this test](./src/pages/Subscription/__tests__/Subscription.test.tsx)
- check [renderPage method](./src/utils/tests/helpers.tsx) with the Toaste
