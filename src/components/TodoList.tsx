import React from 'react';
import {
  Alert,
  List,
} from '@mui/material';
import {
  ITodo,
  RemoveTodo,
  ToggleTodo,
} from '../models/todo';
import TodoListItem from './TodoListItem';

interface Props {
  todos: ITodo[];
  onToggleTodo: ToggleTodo;
  onRemoveTodo: RemoveTodo;
}

const TodoList: React.FC<Props> = ({
  todos,
  onToggleTodo,
  onRemoveTodo,
}) => (
  <>
    {todos.length > 0 ? (
      <List disablePadding>
        {todos.map((todo) => (
          <TodoListItem
            key={todo.name}
            todo={todo}
            onToggleTodo={onToggleTodo}
            onRemoveTodo={onRemoveTodo}
          />
        ))}
      </List>
    ) : (
      <Alert severity="info">
        No todo available
      </Alert>
    )}
  </>
);

export default TodoList;
