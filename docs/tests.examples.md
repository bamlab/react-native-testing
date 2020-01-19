# Tests Examples

## Table of contents

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

### Custom `render` function

To start testing your app, you will first need your own `render` function (I called mine `renderPage`) to render the components you want to test. With integration tests, I personnaly like to test page components only.

#### Redux Provider

If you use Redux, you want your page to have access to the redux store and be capable of dispacthing actions to it in your test environment.

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
    </Provider>
  );

  return render(pageContainerComponent);
```

Files to check out:

- [this test](../../pages/TodoList/__tests__/TodoList.test.tsx)
- [renderPage method](./helpers.tsx)
- [mockStore](./mockStore.ts)

#### Saga initialization

The sagas are set up in the `renderPage` method and then behave just like they would in the devlopement environment.

```typescript
export const sagaMiddleware = createSagaMiddleware();

export const renderPage = (page: ReactElement, initialState?: Partial<IAppState>) => {
  storeManager.store = createInitialiasedStore(initialState);
  sagaMiddleware.run(watchAll);

  const pageContainerComponent = <Provider store={storeManager.store}>{page}</Provider>;

  return render(pageContainerComponent);
};
```

Files to check out:

- [this test](../../pages/Subscription/__tests__/Subscription.test.tsx)
- [renderPage method](./helpers.tsx)
- [mockStore](./mockStore.ts)

#### Root-level components (ex: Toaster)

Let's say that your `App` component looks like this :

```jsx
<ThemeProvider theme={theme}>
  <Provider store={store}>
    <AppContainer />
    <Toaster />
  </Provider>
</ThemeProvider>
```

Then in some tests, you will need to test that your Toaster appears correctly. To do that, just add your Toaster component in your `renderPage` function like so:

#### Navigation

### Api Calls

## Find elements in your DOM

- Buttons --> getByText
- Input --> getByPlaceholder
- Loader --> getByTestId

## Simulate user interaction

- Press button
- Write in input
- Scroll
- Any other event

## Expect some (visual) feedback

- Loading
- Navigation
- A component appears (waitForElement)
- A disabled button does not call its onClick

## Other scenarios

- Need fake timers
- Need to rerender page

```

```
