# Documentation for integration test examples

## List of examples

- [Data flow](#data-flow)
  - [Redux store](#redux-store)
  - [Redux saga](#redux-saga)
  - [External api calls with fetch / wretch](#external-api-calls-with-fetch-or-wretch)
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

Files to check out:

- [this test](../../pages/TodoList/__tests__/TodoList.test.tsx)
- [renderPage method](./helpers.tsx)
- [mockStore](./mockStore.ts)

Basically, for each test, we create a new real redux store with an initial state.
This store is passed to the page via a provider wrapping the page in the renderPage method:

```typescript
export const renderPage = (
  page: ReactElement,
  initialState?: Partial<IAppState>,
) => {
  storeManager.store = createInitialiasedStore(initialState);

  const pageContainerComponent = (
    <Provider store={storeManager.store}>
      {page}
      <Toaster />
    </Provider>
  );
  const pageRendered = render(pageContainerComponent);

  return {...pageRendered};
```

In the setup of the test, use the previously defined `renderPage` method

```typescript
it('should display previous and new todos', async () => {
  // SETUP
  const page = renderPage(<TodoList />, initialState);
  // ...
});
```

### Redux saga

Check out:

- [this test](../../pages/Subscription/__tests__/Subscription.test.tsx)
- [renderPage method](./helpers.tsx)
- [mockStore](./mockStore.ts)

The sagas are set up in the `renderPage` method and then behave just like they would in the devlopement environment.

```typescript
export const sagaMiddleware = createSagaMiddleware();

export const renderPage = (
  page: ReactElement,
  initialState?: Partial<IAppState>,
) => {
  storeManager.store = createInitialiasedStore(initialState);
  sagaMiddleware.run(watchAll);

  const pageContainerComponent = (
    <Provider store={storeManager.store}>
      {page}
      <Toaster />
    </Provider>
  );
  const pageRendered = render(pageContainerComponent);
  return {...pageRendered};
};
```

In your test, use an async function as well as the [waitForElement](https://callstack.github.io/react-native-testing-library/docs/api#waitforelement) helper to find your React Node in the DOM

```typescript
it('should display succesful message on successful subscription', async () => {
  // ...
  // THEN
  const SuccessMessage = await waitForElement(() =>
    page.queryByText(wording.subscriptionSuccessful),
  );
  expect(SuccessMessage).toBeDefined();
});
```

### External api calls with fetch or wretch

To make our integration tests cover as much code as possible, we use [fetch-mock](https://github.com/wheresrhys/fetch-mock) to mock the api calls. That way, we can test that our api calls to our server are actually made and have the right parameters.

Files to check out:

- [test for simple call](../../pages/Subscription/__tests__/Subscription.test.tsx)
- [test for call with response](../../pages/Movies/__tests__/Movies.test.tsx)
- [getMockApiResponse](./helpers.tsx)
- **TODO:** test calls with query parameters and tokens to check

Here is how you can mock api calls with fetch mock and some custom helpers and then test the page using it:

```typescript
  const mockGetMovies = () => {
    fetchMock.get(
      MOVIES_API_ENDPOINT,
      getMockApiResponse(200, {results: mockPopularMovies}),
    );
  };

  it('should load movies and display movies properly', async () => {
    // SETUP
    mockGetMovies();
    // ...
    // THEN
    const FirstMovie = await waitForElement(() =>
      page.queryByText(mockPopularMovies[0].title),
    );
    expect(FirstMovie).toBeDefined();
  });
});
```

---

## Navigation

### Internal navigation

Basically, you need to mock to mock react-native-gesture-handler in a jest setup file

```typescript
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    State: {},
    PanGestureHandler: View,
    BaseButton: View,
    Directions: {},
  };
});
```

Then you need a renderWithNavigation function:

```typescript
export const renderWithNavigation = (
  pageRoute: string,
  initialState?: IAppState,
) => {
  const App = createAppContainerWithInitialRoute(pageRoute);

  const pageContainerComponent = <App />;
  const pageRendered = render(pageContainerComponent);

  return {...pageRendered};
};
```

Finally write your test:

```typescript
describe('[Page] Home', () => {
  it('should navigate to about page without any trouble', async () => {
    const page = renderWithNavigation(Routes.Home);
    const AboutButton = page.getByText('About');
    fireEvent.press(AboutButton);
    const AboutTitle = await waitForElement(() =>
      page.queryByText(wording.aboutTitle),
    );
    expect(AboutTitle).toBeDefined();
  });
});
```

Files and functions to check out:

- [the test](../../pages/Home/__tests__/Home.test.tsx)
- [setup file](./setup.ts)
- [renderWithNavigation](./helpers.tsx)
- [createAppContainerWithInitialRoute](../../navigation/stack.ts)

### Outside page navigation

TODO: with navigation from saga with navigateService

### Asynchronous navigation

TODO: using flushMicrotasksQueue

---

## Timers

To tests features including a timer (implemented with setTimeout or the saga effect delay for instance), you need to use [jest fake timers](https://jestjs.io/docs/en/timer-mocks.html)

```typescript
it('should load movies and display movies properly [using jest timers]', () => {
  // SETUP
  jest.useFakeTimers();
  //...
  jest.runOnlyPendingTimers(); // don't run all timers here because delay (the redux saga effect) use recursive timers
  // THEN it shows the movies from the external API
  const FirstMovie = waitForElement(() =>
    // no need for await since we use fake timers
    page.queryByText(mockPopularMovies[0].title),
  );
  expect(FirstMovie).toBeDefined();
});
```

You can find the whole test [here](../../pages/Movies/__tests__/Movies.test.tsx)

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
