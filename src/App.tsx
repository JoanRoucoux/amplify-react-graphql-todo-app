import React, { useEffect, useState } from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { ThemeProvider } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
} from '@mui/material';
import {
  createTodo,
  updateTodo,
  deleteTodo,
} from './graphql/mutations';
import {
  onCreateTodo,
  onDeleteTodo,
  onUpdateTodo,
} from './graphql/subscriptions';
import { listTodos } from './graphql/queries';
import {
  ITodo,
  mapListTodosQuery,
  mapOnCreateTodoSubscription,
  mapOnDeleteTodoSubscription,
  mapOnUpdateTodoSubscription,
} from './models/todo';
import {
  callGraphQL,
  subscribeGraphQL,
} from './models/graphql-api';
import {
  CreateTodoMutation,
  CreateTodoMutationVariables,
  DeleteTodoMutation,
  DeleteTodoMutationVariables,
  ListTodosQuery,
  OnCreateTodoSubscription,
  OnDeleteTodoSubscription,
  OnUpdateTodoSubscription,
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
} from './API';
import awsExports from './aws-exports';
import { theme } from './theme';
import {
  AddTodoForm,
  ApiErrorMessage,
  CardHeader,
  Copyright,
  Header,
  Loader,
  TodoList,
} from './components';

// The aws-exports file holds the information required
// to connect and interact with the back-end service.
Amplify.configure(awsExports);

const App: React.FC = () => {
  const [name, setTodoName] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [apiError, setApiError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const subscription = subscribeGraphQL<OnCreateTodoSubscription>(
      onCreateTodo,
      onCreateTodoHandler,
    );

    return () => subscription.unsubscribe();
  }, [todos]);

  useEffect(() => {
    const subscription = subscribeGraphQL<OnUpdateTodoSubscription>(
      onUpdateTodo,
      onUpdateTodoHandler,
    );

    return () => subscription.unsubscribe();
  }, [todos]);

  useEffect(() => {
    const subscription = subscribeGraphQL<OnDeleteTodoSubscription>(
      onDeleteTodo,
      onDeleteTodoHandler,
    );

    return () => subscription.unsubscribe();
  }, [todos]);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await callGraphQL<ListTodosQuery>(listTodos);
      const todoList = mapListTodosQuery(response);
      setTodos(todoList);
    } catch (error) {
      console.error('Failed fetching todos:', error);
      setApiError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onCreateTodoHandler = (
    createTodoSubscription: OnCreateTodoSubscription,
  ) => {
    const todo = mapOnCreateTodoSubscription(createTodoSubscription);
    setTodos([...todos, todo]);
    setTodoName('');
  };

  const onUpdateTodoHandler = (
    updateTodoSubscription: OnUpdateTodoSubscription,
  ) => {
    const todo = mapOnUpdateTodoSubscription(updateTodoSubscription);
    const updatedTodos = todos.map((item) => (item.id === todo.id ? { ...todo } : item));
    setTodos(updatedTodos);
  };

  const onDeleteTodoHandler = (
    deleteTodoSubscription: OnDeleteTodoSubscription,
  ) => {
    const {
      id,
    } = mapOnDeleteTodoSubscription(deleteTodoSubscription);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!name) return;
    try {
      await callGraphQL<CreateTodoMutation>(createTodo, {
        input: {
          name,
          completed: false,
        },
      } as CreateTodoMutationVariables);
    } catch (error) {
      console.error('Failed creating todo:', error);
      setApiError(true);
    }
  };

  const toggleTodo = async (todo: ITodo) => {
    if (!todo) return;
    try {
      await callGraphQL<UpdateTodoMutation>(updateTodo, {
        input: {
          ...todo,
          completed: !todo.completed,
        },
      } as UpdateTodoMutationVariables);
    } catch (error) {
      console.error('Failed updating todo:', error);
      setApiError(true);
    }
  };

  const removeTodo = async (id: string) => {
    if (!id) return;
    try {
      await callGraphQL<DeleteTodoMutation>(deleteTodo, {
        input: {
          id,
        },
      } as DeleteTodoMutationVariables);
    } catch (error) {
      console.error('Failed deleting todo:', error);
      setApiError(true);
    }
  };

  const setInput = (value: string) => {
    setTodoName(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          mt: 8,
          mb: 4,
        }}
      >
        <Card>
          <CardContent sx={{ p: 4 }}>
            <CardHeader />
            <AddTodoForm
              name={name}
              onAddTodo={addTodo}
              onNameChange={setInput}
            />
            {apiError ? (
              <ApiErrorMessage />
            ) : isLoading ? (
              <Loader />
            ) : (
              <TodoList
                todos={todos}
                onToggleTodo={toggleTodo}
                onRemoveTodo={removeTodo}
              />
            )}
          </CardContent>
        </Card>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};

export default withAuthenticator(App);
