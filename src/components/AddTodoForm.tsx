import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import {
  AddTodo,
  ChangeName,
} from '../models/todo';

interface Props {
  name: string;
  onAddTodo: AddTodo;
  onNameChange: ChangeName;
}

const AddTodoForm: React.FC<Props> = ({
  name,
  onAddTodo,
  onNameChange,
}) => (
  <Box sx={{ mb: 3 }}>
    <form
      noValidate
      autoComplete="none"
      onSubmit={onAddTodo}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={10}
        >
          <TextField
            required
            name="addTodo"
            label="Add your new todo"
            type="text"
            fullWidth
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onNameChange(event.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          display="flex"
          alignItems="stretch"
        >
          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  </Box>
);

export default AddTodoForm;
