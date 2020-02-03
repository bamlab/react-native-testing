import React from 'react';
import { renderPage, getPropsWithNavigation } from '../../../utils/tests/helpers';
import { TodoList } from '../TodoList';
import { wording } from '../../../utils/wording';
import { fireEvent, waitForElement } from 'react-native-testing-library';

describe('[Page] TodoList', () => {
  const initialState = {
    todos: {
      todoList: ['buy groceries'],
    },
  };

  it('should display previous and new todos', async () => {
    const newTodoText = 'go running';
    const page = renderPage(<TodoList />, initialState);
    // GIVEN
    const TodoInput = page.getByPlaceholder(wording.todos.newTodo);
    const AddTodoButton = page.getByText(wording.todos.add);
    const FirstTodo = page.queryByText('buy groceries');
    expect(FirstTodo).toBeTruthy();
    // WHEN
    fireEvent.changeText(TodoInput, newTodoText);
    fireEvent.press(AddTodoButton);
    // THEN
    const NewTodo = await waitForElement(() => page.queryByText(newTodoText));
    expect(NewTodo).toBeTruthy();
  });
});
