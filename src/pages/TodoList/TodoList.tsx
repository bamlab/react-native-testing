import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Container, Card, Input} from '../../components/StyledComponents';
import styled from 'styled-components/native';
import {Button} from '../../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {todoListSelector} from '../../modules/todos/selectors';
import {TodoActions} from '../../modules/todos/actions';

export const TodoList = () => {
  const todos = useSelector(todoListSelector);
  const dispatch = useDispatch();
  const [textTodo, setTextTodo] = useState('');

  const onChangeText = (text: string) => setTextTodo(text);
  const onSubmitTodo = () => {
    dispatch(TodoActions.addTodo(textTodo));
    setTextTodo('');
  };

  return (
    <Container>
      <Card>
        <StyledInput
          value={textTodo}
          onChangeText={onChangeText}
          placeholder="New todo..."
        />
        <Button title="Add" onPress={onSubmitTodo} />
        <TodosContainer>
          {todos.map((todo, index) => (
            <Text key={index}>{todo}</Text>
          ))}
        </TodosContainer>
      </Card>
    </Container>
  );
};

const TodosContainer = styled(View)`
  text-align: left;
  margin-top: 8;
`;

const StyledInput = styled(Input)`
  width: 100%;
  margin: 8px;
`;
