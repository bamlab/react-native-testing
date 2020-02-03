# Tests Examples

## Table of contents

  - [Introduction](#introduction)
  - [Setup your tests](#setup-your-tests)
    - [Custom `render` function](#custom-render-function)
      - [Redux Provider](#redux-provider)
      - [Saga initialization](#saga-initialization)
      - [Root-level components (eg. Toaster)](#root-level-components-eg-toaster)
      - [Navigation](#navigation)
        - [Real navigation](#real-navigation)
        - [No Navigation](#no-navigation)
    - [Server Api Calls](#server-api-calls)
  - [Find elements in your DOM](#find-elements-in-your-dom)
  - [Simulate user interaction](#simulate-user-interaction)
  - [Expect some (visual) feedback](#expect-some-visual-feedback)
    - [Appearance of an element](#appearance-of-an-element)
    - [An element is disabled](#an-element-is-disabled)
    - [Specific styling](#specific-styling)
  - [Other scenarios](#other-scenarios)
    - [Mock times with jest](#mock-times-with-jest)

## Introduction

A typical integration test looks like this:

```typescript
it('should display new todo', async () => {
  // SETUP: render the page you want to test
  const page = renderPage(<TodoList />, initialState);
  // GIVEN: get the DOM elements you want to interact with
  const TodoInput = page.getByPlaceholder(wording.todos.newTodo);
  const AddTodoButton = page.getByText(wording.todos.add);
  // WHEN: simulate user interaction
  fireEvent.changeText(TodoInput, newTodoText);
  fireEvent.press(AddTodoButton);
  // THEN: expect a visual feedback
  const NewTodo = await waitForElement(() => page.queryByText(newTodoText));
  expect(NewTodo).toBeTruthy();
});
```

Now let's see the different cases you might encounter while testing your React Native App

## Setup your tests

To make sure your integration tests are as close as what the user will experience as possible, you need to setup your setup your tests properly.
The setup of your tests should reproduce as much as possible the code run at the top of our app in our `App` component. Indeed, if in your app, you use redux and sagas for example, they should run in your test environment as well.

Here is an example of a basic `App` component:

```jsx
export const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AppContainer />
      <Toaster />
    </Provider>
  </ThemeProvider>
);
```

Besides that, we also have sagas that are fired at the start of the app. Let's see how to set it all up.

### Custom `render` function

To start testing your app, you will first need your own `render` function (I called mine `renderPage`) to render the components you want to test. With integration tests, I personnaly like to test page components only. It's in your `render` function that you will setup Redux, sagas and such.

If you want to dive straight into the code, here is [the file](../src/utils/tests/helpers.tsx) with the renderPage function

#### Redux Provider

If you use Redux, you want your page to have access to the redux store and be capable of dispacthing actions to it in your test environment.

Basically, for each test, we create a new real redux store with an initial state.
This store is passed to the page via a provider wrapping the page in the renderPage method:

```jsx
export const renderPage = (
  page: ReactElement,
  initialState?: Partial<IAppState>,
) => {
  storeManager.store = createInitialiasedStore(initialState);

  const pageContainerComponent = (
    <Provider store={storeManager.store}>
      {page}
    </Provider>
  );

  return render(pageContainerComponent);
```

You can notice the initialisation of a new store through a helper `creatInitialisedStore`. Here it is:

```typescript
export const createInitialiasedStore = (initialState?: Partial<IAppState>) =>
  createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
```

Files to check out:

- [this test](../src/pages/TodoList/__tests__/TodoList.test.tsx)
- [mockStore](../src/utils/tests/mockStore.ts)

#### Saga initialization

The sagas are set up in the `renderPage` method and then behave just like they would in the devlopement environment.

```jsx
export const renderPage = (page: ReactElement, initialState?: Partial<IAppState>) => {
  storeManager.store = createInitialiasedStore(initialState);
  sagaMiddleware.run(watchAll);

  const pageContainerComponent = <Provider store={storeManager.store}>{page}</Provider>;

  return render(pageContainerComponent);
};
```

Files to check out:

- [this test](../src/pages/Subscription/__tests__/Subscription.test.tsx)
- [renderPage method](../src/utils/tests/helpers.tsx)
- [mockStore](../src/utils/tests/mockStore.ts)

#### Root-level components (eg. Toaster)

Let's say that your `App` component looks like this :

```jsx
export const App = () => (
  <Provider store={store}>
    <AppContainer />
    <Toaster />
  </Provider>
);
```

Then in some tests, you will need to test that your Toaster appears correctly. To do that, just add your Toaster component in your `renderPage` function like so:

```jsx
export const renderPage = (
  page: ReactElement,
  initialState?: Partial<IAppState>,
) => {
  storeManager.store = createInitialiasedStore(initialState);

  const pageContainerComponent = (
    <Provider store={storeManager.store}>
      {page}
      <Toaster/>
    </Provider>
  );

  return render(pageContainerComponent);
```

#### Navigation

For navigation, you have two options:

1. You can mock the native parts of your navigation library.

   - Pros:

     - it's less tied to your implementation and in your tests,
     - you can actually check that the header or the tab bar are properly working
     - you can test that navigation actually works in your tests

   - Cons:
     - can be quite hard to setup

2. You can simply not render your navigation stack and instead only render the page you want to test. That's what we have been doing so far in the `renderPage` function.
   - Pros:
     - no setup required
   - Cons:
     - tied to implementation details (if you change navigation lib one day, you'll have to rewrite al your tests)
     - you can't test your headers or tab bars
     - you can only test that your `navigation.navigate` function is called with the right parameters

##### Real navigation

Here is the `renderNavigation` function:

```jsx
export const renderWithNavigation = (pageRoute: string, initialState?: IAppState) => {
  const App = createAppContainerWithInitialRoute(pageRoute);
  storeManager.store = createInitialiasedStore(initialState);
  sagaMiddlewareTest.run(watchAll);

  const pageContainerComponent = (
    <Provider store={storeManager.store}>
      <App />
      <Toaster />
    </Provider>
  );

  return render(pageContainerComponent);
};
```

As you can see, instead of passing a page component to the `renderWithNavigation` function, we pass it a route name. Then with the `createAppContainerWithInitialRoute` we tell the App to render the proper page:

```typescript
export const createAppContainerWithInitialRoute = (initialRouteName: string) =>
  createAppContainer(createStackNavigator(routes, { initialRouteName }));
```

Files to check out:
- [Jest setup](../jest.setup.ts) where I mock React Native gesture handler
- [Navigation setup](../src/navigation/stack.ts) where I have the `createAppContainerWithInitialRoute` helper
- [Home test](../src/pages/Home/__tests__/Home.test.tsx) where I use renderWithNavigation

##### No Navigation

You have already seen the `renderPage` function, you don't have much to do if you don't want to render the navigation. You only have to pass a `navigation` prop to the page you render. To avoid re-writing the navigation prop each time, I use [this helper](../src/utils/tests/helpers.tsx):

```typescript
export const getPropsWithNavigation = (
  props?: any,
  navigationPropExtension?: Partial<NavigationScreenProp<{}>>
) => ({
  ...props,
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    ...navigationPropExtension,
  },
});
```

Here is a [test](../src/pages/About/__tests__/About.test.tsx) with fake navigation:

```jsx
it('should navigate to home page on subscribe button press', () => {
  // SETUP
  const props = getPropsWithNavigation();
  const page = renderPage(<About {...props} />);
  // GIVEN
  const NavigateSubscribeButton = page.getByText(wording.subscribe);
  // WHEN
  fireEvent.press(NavigateSubscribeButton);
  // THEN
  expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.Home);
});
```

### Server Api Calls

## Find elements in your DOM

To find elements in the DOM you need to use the [`getBy*` of `queryBy*` queries](https://callstack.github.io/react-native-testing-library/docs/api-queries). If you need to assert the presence or absence of an element, use the queryBy functions (they return null if you don't find the element). Otherwise use the getBy functions, they throw an error when they don't find the element you're looking for.

Try to find DOM elements thanks to visual characteristics that a real user would see (or if not possible, accessibility criterias). That way, you test will give you more confidence that your user will indeed be capable of interacting with the element. For instance, prefer the use of `getByText` rather than `getByTestID`.

Here is a list of the element you can try to find in your DOM and the corresping queries you can use:

- Button: `getByText`
- Inputs: `getByPlaceholder` or `getByDisplayValue`
- Image: `getByA11yLabel`

If the element you want to find will only appear after a certain asynchronous task has run, you should use [waitForElement](https://callstack.github.io/react-native-testing-library/docs/api).

## Simulate user interaction

To simulate user interactions, use the `fireEvent` function detailed [here](https://callstack.github.io/react-native-testing-library/docs/api).

## Expect some (visual) feedback

### Appearance of an element

To check the presence of an element, use the `queryBy*` functions such as `queryByText` used below. Once you have retrieved the element, check its truthiness. This is more explicit than just using a `getBy*` function that will immedialty throw an error if it does not find the element.

```typescript
  it('should display previous and new todos', async () => {
    const initialState = {
    todos: { todoList: ['buy groceries'] },
  };
    const newTodoText = 'go running';
    const page = renderPage(<TodoList />, initialState);
    // GIVEN 
    const TodoInput = page.getByPlaceholder(wording.todos.newTodo);
    const AddTodoButton = page.getByText(wording.todos.add);
    const FirstTodo = page.queryByText('buy groceries');
    expect(FirstTodo).toBeTruthy();
    // WHEN we add a new todo
    fireEvent.changeText(TodoInput, newTodoText);
    fireEvent.press(AddTodoButton);
    // THEN we expect it to appear
    const NewTodo = await waitForElement(() => page.queryByText(newTodoText));
    expect(NewTodo).toBeTruthy();
  });
```

Files to check out:
- [the test](../src/pages/TodoList/__tests__/TodoList.test.tsx)
- [the tested page](../src/pages/TodoList/TodoList.tsx)

### An element is disabled 

Unfortunately, when you render a disabled button, if you fire a press event on it, it will work even though the button is disabled. That's why if you want to check that a button is disabled, you can either look at its `disabled` prop or you can use `toBeDisabled` from [jest-native](https://github.com/testing-library/jest-native). This library is an extension of the jest `expect` function offering you more tools to check specific things on a react native component. Apart from `toBeDisabled`, you also have `toHaveProp` or `toHaveStyle`.

Here is an example to check that a button is disabled:

```typescript
  it('shows disabled confirm button while password is blank', () => {
    const page = renderPage(<DisabledButtonPage {...props} />);
    const ConfirmButton = page.getByText('Confirm');
    expect(ConfirmButton).toBeDisabled();
  });
```

Files to check out:
- [the test](../src/pages/DisabledButton/__tests__/DisabledButton.test.tsx)
- [the tested page](../src/pages/DisabledButton/DisabledButton.tsx)


### Specific styling

If you want to check a very specific piece of style in your app, you should use [toHaveStyle](https://github.com/testing-library/jest-native#tohavestyle) from the jest-native library (detailed in the paragraph above).

However if you want to test that different styles match what you expect, you can still use a basic snapshot like so:
```typescript
    it('shows success message when password confirmed', () => {
    // Given
    const page = renderPage(<DisabledButton {...props} />);
    const PasswordInput = page.getByPlaceholder('password');
    const ConfirmButton = page.getByText('Confirm');
    // When
    fireEvent.changeText(PasswordInput, 'azertyuiop123');
    expect(ConfirmButton).toBeEnabled();
    fireEvent.press(ConfirmButton);
    // Then
    const SuccessMessage = page.queryByText('Password confirmed');
    expect(SuccessMessage).toBeTruthy();
    expect(page).toMatchSnapshot();
  });
```


## Other scenarios

### Mock times with jest

If you have long timers in your app (for animations or api calls for instance) and don't want your tests to take forever, you can use jest fake timers.

```typescript
  it('should load movies and display movies properly [using jest timers]', () => {
    // SETUP
    jest.useFakeTimers();
    // we use fake timers to skip the 2 seconds of delay during the API call
    // thus we don't need to use async / await in this test
    mockGetMovies();
    // GIVEN the page renders
    const page = renderPage(<Movies />);
    // THEN it loads
    const Loader = page.queryByTestId('loader');
    expect(Loader).toBeTruthy();
    jest.runOnlyPendingTimers(); // don't run all timers here because delay (the redux saga effect) use recursive timers
    // THEN it shows the movies from the external API
    const FirstMovie = waitForElement(() => page.queryByText(mockPopularMovies[0].title));
    const SecondMovie = waitForElement(() => page.queryByText(mockPopularMovies[1].title));
    expect(FirstMovie).toBeTruthy();
    expect(SecondMovie).toBeTruthy();
  });
```

Files to check out:
- [the test](../src/pages/Movies/__tests__/Movies.test.tsx)
- [the tested page](../src/pages/Movies/Movies.tsx)
- [the saga with the timer to fake](../src/modules/movies/sagas.ts)
