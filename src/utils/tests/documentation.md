# Documentation for integration test examples

## Table of contents

- [Data flow](#data-flow)
  - [Redux store](#redux-store)
  - [Redux saga](#redux-saga)
  - [External api calls with fetch / wretch](#external-api-calls-with-fetch-/-wretch)
- [Navigation](#navigation)
  - [Internal navigation](#internal-navigation)
  - [Outside page navigation](#outside-page-navigation)
  - [Asynchronous navigation](#asynchronous-navigation)
- [Timers (delay, setTimeout...)](#timers)
- [User interface](#user-interface)
  - [Styling library](#styling-library)
  - [Formik form](#formik-form)
  - [Inputs](#inputs)
  - [Components outside the tested page](#components-outside-the-tested-page)
  - [Loading](#loading)
  - [Scroll view](#scroll-view)
  - [Native code in general](#native-code-in-general)

---

## Data flow

### Redux store

Check out:

- [this test](../../pages/TodoList/__tests__/TodoList.test.tsx)
- [renderPage method](./helpers.tsx)
- [mockStore](./mockStore.ts)

Basically, for each test, we create a new real redux store with an initial state.
This store is passed to the page via a provider wrapping the page in the renderPage method.

### Redux saga

Check out:

- [this test](../../pages/Subscription/__tests__/Subscription.test.tsx)
- [renderPage method](./helpers.tsx)
- [mockStore](./mockStore.ts)

The sagas are set up in the `renderPage` method and then behave just like they would in the staging environment.

### External api calls with fetch / wretch

To make our integration tests cover as much code as possible, we use [fetch-mock](https://github.com/wheresrhys/fetch-mock) to mock the api calls. That way, we can test that our api calls to our server are actually made and have the right parameters.

- [simple call](../../pages/Subscription/__tests__/Subscription.test.tsx)
- [with response](../../pages/Movies/__tests__/Movies.test.tsx)
- **TODO:** with query parameters and tokens to check

---

## Navigation

### Internal navigation

Check out:

- [this test](../../pages/About/__tests__/About.test.tsx)
- the helper `getPropsWithNavigation` in the [helpers](../../utils/tests/./helpers.tsx)

I am currently looking for a better solution that would wrap the page with its real stack navigator as advised [here](https://www.native-testing-library.com/docs/example-navigation)

### Outside page navigation

TODO: with navigation from saga with navigateService

### Asynchronous navigation

TODO: using flushMicrotasksQueue

---

## Timers

To tests features including a timer (implemented with setTimeout or the saga effect delay for instance), you need to use jest fake timers

Check out:

- [this test](../../pages/Movies/__tests__/Movies.test.tsx)

---

## User interface

### Styling library

Check out:

- [this test](../../pages/Subscription/__tests__/Subscription.test.tsx)
- the [renderWithTheme method](./helpers.tsx)

Don't forget to import `jest-styled-components` in each test file.

WARNING : not working yet with theme provider !!

### Formik form

Check out:

- [this test](../../pages/Subscription/__tests__/Subscription.test.tsx)

### Inputs

Check out:

- [this test](../../pages/Subscription/__tests__/Subscription.test.tsx)

Careful, getByPlaceholder might not work depending on the input you use.
I don't think it works with react-native-paper for instance

### Components outside the tested page

Basically, if you're in a page where you want to test a component that is outside its DOM, you need to put the component in the `renderPage` method next to your page.
In our case, it's the `Toaster component` that is outside our page, that's why we put it in the `renderPage` method.

Check out:

- [the app](../../App.tsx)
- [this test](../../pages/Subscription/__tests__/Subscription.test.tsx)
- the [renderPage method](./helpers.tsx)

### Loading

Check out:

- [the page tested](../../pages/Movies/Movies.tsx)
- [the correspondign test](../../pages/Movies/__tests__/Movies.test.tsx)

### Scroll View

TODO: see Antoine Jubin

### Native code in general

TODO: By mocking the proper native library with jest
