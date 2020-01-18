# Tests Examples

## Table of contents

## Setup your tests

### Custom `render` function

To start testing your app, you will first need your own `render` function (I called mine `renderPage`).

#### Redux Provider

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
