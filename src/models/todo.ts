import { GraphQLResult } from '@aws-amplify/api';
import {
  ListTodosQuery,
  OnCreateTodoSubscription,
  OnDeleteTodoSubscription,
  OnUpdateTodoSubscription,
} from '../API';

interface ITodo {
  id: string;
  name: string;
  completed: boolean;
}

type AddTodo = (event: React.SyntheticEvent) => void;
type ToggleTodo = (todo: ITodo) => void;
type RemoveTodo = (id: string) => void;
type ChangeName = (id: string) => void;

const mapListTodosQuery = (
  listTodosQuery: GraphQLResult<ListTodosQuery>,
): ITodo[] => listTodosQuery.data?.listTodos?.items?.map(
  (todo) => ({
    id: todo?.id,
    name: todo?.name,
    completed: todo?.completed,
  } as ITodo),
) || [];

const mapOnCreateTodoSubscription = (
  createTodoSubscription: OnCreateTodoSubscription,
): ITodo => {
  const {
    id,
    name,
    completed,
  } = createTodoSubscription.onCreateTodo || {};
  return {
    id,
    name,
    completed,
  } as ITodo;
};

const mapOnUpdateTodoSubscription = (
  onUpdateTodoSubscription: OnUpdateTodoSubscription,
): ITodo => {
  const {
    id,
    name,
    completed,
  } = onUpdateTodoSubscription.onUpdateTodo || {};
  return {
    id,
    name,
    completed,
  } as ITodo;
};

const mapOnDeleteTodoSubscription = (
  onDeleteTodoSubscription: OnDeleteTodoSubscription,
): ITodo => {
  const {
    id,
    name,
    completed,
  } = onDeleteTodoSubscription.onDeleteTodo || {};
  return {
    id,
    name,
    completed,
  } as ITodo;
};

export type {
  ITodo,
  AddTodo,
  ToggleTodo,
  RemoveTodo,
  ChangeName,
};

export {
  mapListTodosQuery,
  mapOnCreateTodoSubscription,
  mapOnUpdateTodoSubscription,
  mapOnDeleteTodoSubscription,
};
