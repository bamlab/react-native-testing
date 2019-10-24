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
    mockGetMovies();
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

If you use a styling library, you need to wrap your rendered page with your Theme provider. You can do it for example in a helper:

```typescript
export const renderPage = (
  page: ReactElement,
  initialState?: Partial<IAppState>,
) => {
  // ...
  const pageContainerComponent = (
    <ThemeProvider theme={theme}>
      // other providers
      {page}
    </ThemeProvider>
  );
  const pageRendered = render(pageContainerComponent);
  return {...pageRendered};
};
```

Then use it like this:

```typescript
it('should display succesful message on successful subscription', async () => {
  // SETUP
  // ...
  const page = renderPage(<Subscription {...props} />);
  // ...
});
```

Files to check out:

- [a test](../../pages/Subscription/__tests__/Subscription.test.tsx)
- [renderWithTheme method](./helpers.tsx)

Don't forget to import `jest-styled-components` in each test file if you use styled-components.

WARNING : not working yet with theme provider !!

### Inputs

If possible, get the input in the DOM via its placeholder. However, getByPlaceholder might not work depending on the input you use.
I don't think it works with react-native-paper for instance

Here is an extract from a [test featuring an input](../../pages/Subscription/__tests__/Subscription.test.tsx)

```typescript
it('should display succesful message on successful subscription', async () => {
  // ...
  // GIVEN
  const EmailInput = page.getByPlaceholder(wording.emailPlaceholder);
  // ...
});
```

### Formik form

Nothing specific to do here really, here is the [test](../../pages/Subscription/__tests__/Subscription.test.tsx):

```typescript
it('should display succesful message on successful subscription', async () => {
  // SETUP
  mockCallSubscribe(200);
  const page = renderPage(<Subscription {...props} />);
  // GIVEN
  const EmailInput = page.getByPlaceholder(wording.emailPlaceholder);
  const ValidateButton = page.getByText(wording.validateEmail);
  // WHEN
  fireEvent.changeText(EmailInput, 'hello@bam.com');
  fireEvent.press(ValidateButton);
  // THEN
  const SuccessMessage = await waitForElement(() =>
    page.queryByText(wording.subscriptionSuccessful),
  );
  expect(SuccessMessage).toBeDefined();
});
```

### Components outside the tested page

Basically, if you're in a page where you want to test a component that is outside its DOM, you need to put the component in the `renderPage` method next to your page.
In our case, it's the `Toaster component` that is outside our page, that's why we put it in the [renderPage method](./helpers.tsx) method.

```typescript
export const renderPage = (
  page: ReactElement,
  initialState?: Partial<IAppState>,
) => {
  // ...
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

And then, if you want to assert on the appearance of the toaster, check its presence through its text as you would usually do:

```typescript
it('should display succesful message on successful subscription', async () => {
  // ...
  const page = renderPage(<Subscription {...props} />);
  //...
  // THEN
  const SuccessMessage = await waitForElement(() =>
    page.queryByText(wording.subscriptionSuccessful),
  );
  expect(SuccessMessage).toBeDefined();
});
```

Files to check out:

- [the app](../../App.tsx) with the setup of the Toaster
- [this test](../../pages/Subscription/__tests__/Subscription.test.tsx)

### Loading

A very common scenario is having a loader appear somewhere on the screen while you wait for your api call to finish. To do that, don't write a test that only checks the loader but write a test covering the whole functionnality.

Below is the extract of the [page](../../pages/Movies/Movies.tsx) we want to test, you can notice the testID on the ActivityIndicator that will help us find it in the DOM in our test.

```typescript
useEffect(() => {
  dispatch(MoviesActions.getMovies());
}, [dispatch]);

return (
  <Container>
    <Card>
      {movies ? (
        movies.map((movie, index) => <Text key={index}>{movie}</Text>)
      ) : (
        <ActivityIndicator size="large" testID="loader" />
      )}
    </Card>
  </Container>
);
```

And then comes the [test](../../pages/Movies/__tests__/Movies.test.tsx):

```typescript
it('should load movies and display movies properly', async () => {
  // SETUP
  mockGetMovies();
  // GIVEN the page renders
  const page = renderPage(<Movies />);
  // THEN it loads
  const Loader = page.queryByTestId('loader');
  expect(Loader).toBeDefined();
  // THEN it shows the movies from the external API
  const FirstMovie = await waitForElement(() =>
    page.queryByText(mockPopularMovies[0].title),
  );
  expect(FirstMovie).toBeDefined();
});
```

### Scroll View

TODO: see Antoine Jubin

### Native code in general

TODO: By mocking the proper native library with jest
