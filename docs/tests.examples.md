# Tests Examples

## Table of contents

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

#### Root-level components

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
