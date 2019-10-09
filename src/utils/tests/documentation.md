# Documentation for integration tests

## Table of contents

## Data flow

### Using a redux store

Check out:

- [this test](./src/pages/TodoList/__tests__/TodoList.test.tsx)
- [renderPage method](./src/utils/tests/helpers.tsx)

### Using redux saga

Check out:

- [this test](./src/pages/Subscription/__tests__/Subscription.test.tsx)
- [renderPage method](./src/utils/tests/helpers.tsx)

## Using a styling library

Check [renderWithTheme method](./src/utils/tests/helpers.tsx), don't forget to import `jest-styled-components` in each test file.

WARNING : not working yet with theme provider !!

## Using inputs

Careful, getByPlaceholder might not work depending on the input you use.
I don't think it works with react-native-paper for instance

## Using navigation

### Internal navigation

Currently looking for a better solution that would wrap the page with its real stack navigator

### External navigation

Navigation from saga with navigateService

### Asynchronous navigation

Using flushMicrotasksQueue

## Scroll View

TODO: see Antoine Jubin

## Native code

TODO: By mocking the proper native library with jest

## Using components outside your page

Check out:

- [this test](./src/pages/Subscription/__tests__/Subscription.test.tsx)
- check [renderPage method](./src/utils/tests/helpers.tsx) with the Toaste
