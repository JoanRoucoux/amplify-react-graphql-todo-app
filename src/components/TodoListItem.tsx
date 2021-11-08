import React from 'react';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import {
  ITodo,
  RemoveTodo,
  ToggleTodo,
} from '../models/todo';

interface Props {
  todo: ITodo;
  onToggleTodo: ToggleTodo;
  onRemoveTodo: RemoveTodo;
}

const TodoListItem: React.FC<Props> = ({
  todo,
  onToggleTodo,
  onRemoveTodo,
}) => {
  const {
    id,
    name,
    completed,
  } = todo;
  const keyId = `key-${id}`;
  const labelId = `checkbox-${id}`;

  return (
    <ListItem
      key={keyId}
      secondaryAction={(
        <IconButton
          edge="end"
          aria-label="remove todo"
          onClick={() => onRemoveTodo(id)}
        >
          <DeleteIcon />
        </IconButton>
      )}
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={() => onToggleTodo(todo)}
      >
        <ListItemIcon>
          <Checkbox
            disableRipple
            edge="start"
            checked={completed}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={name}
          sx={{ textDecoration: completed ? 'line-through' : 'none' }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoListItem;
