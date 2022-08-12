import { useEffect, useState } from 'react';
import {
  createTodoMutation,
  deleteTodoMutation,
  getTodoById,
  getTodos,
  updateTodoMutation,
} from '../controller/todoController';
import { isSameTodo, TODO_ALERTS } from '../services/todoServices';
import { CreateTodoInputDto, UpdateTodoInputDto } from '../types/dtos/todoDto';
import { Todo } from '../types/todoType';
import { changeValueInArray, removeItemInArrayByIndex } from '../utils/utils';

interface GetTodo {
  id: string;
  doWhenYouFail: () => void;
}

export default function useTodo() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasUpdateInput, setHasUpdateInput] = useState(false);
  const [todoToBeModified, setTodoToBeModified] = useState<Todo | null>(null);

  const getTodo = async ({ id, doWhenYouFail }: GetTodo) => {
    const { todo } = await getTodoById({ id });
    if (!todo) {
      alert(TODO_ALERTS.NOT_FOUND);
      doWhenYouFail();
      return;
    }
    setSelectedTodo(todo);
  };

  const addToTodoList = (newTodo: Todo) => {
    setTodoList((prevState) => [...prevState, newTodo]);
  };
  const createTodo = async ({ title, content }: CreateTodoInputDto) => {
    const { todo } = await createTodoMutation({ content, title });
    if (!todo) return alert(TODO_ALERTS.FAIL_CREATE);
    addToTodoList(todo);
  };

  const updateToTodoList = (updateTodo: Todo) => {
    setTodoList((prevState) => {
      const idx = prevState.findIndex((todo) => todo.id === updateTodo.id);
      if (idx === -1) throw new Error(TODO_ALERTS.NOT_FOUND_INDEX);

      return changeValueInArray(prevState, updateTodo, idx);
    });

    setSelectedTodo(updateTodo);
    setTodoToBeModified(null);
    setHasUpdateInput(false);
  };

  const updateTodo = async ({ id, title, content }: UpdateTodoInputDto) => {
    const { todo } = await updateTodoMutation({
      id,
      content,
      title,
    });
    if (!todo) return alert(TODO_ALERTS.FAIL_UPDATE);
    updateToTodoList(todo);
  };

  const deleteTodoFromTodoList = async (id: string) => {
    setTodoList((prevState) => {
      const idx = prevState.findIndex((todo) => todo.id === id);
      if (idx === -1) throw new Error(TODO_ALERTS.NOT_FOUND_INDEX);
      return removeItemInArrayByIndex(idx, prevState);
    });

    if (isSameTodo(id, selectedTodo?.id)) setSelectedTodo(null);
    if (isSameTodo(id, todoToBeModified?.id)) {
      setTodoToBeModified(null);
      setHasUpdateInput(false);
    }
  };
  const deleteTodo = async (id: string) => {
    const { ok } = await deleteTodoMutation({ id });
    if (!ok) alert(TODO_ALERTS.FAIL_DELETE);
    deleteTodoFromTodoList(id);
  };

  const clearSelectedTodo = () => {
    selectedTodo && setSelectedTodo(null);
  };

  const toggleUpdateInput = (todo: Todo) => {
    if (!isSameTodo(todo?.id, todoToBeModified?.id)) {
      setTodoToBeModified(todo);
      return setHasUpdateInput(true);
    }
    setHasUpdateInput((prevState) => {
      if (prevState) {
        setTodoToBeModified(null);
      }
      return !prevState;
    });
  };

  const getTodoAll = async () => {
    const { todos } = await getTodos();
    setTodoList(todos || []);
  };

  useEffect(() => {
    getTodoAll();
  }, []);

  return {
    hasUpdateInput,
    todoToBeModified,
    todoList,
    createTodo,
    updateTodo,
    deleteTodo,
    selectedTodo,
    getTodo,
    clearSelectedTodo,
    toggleUpdateInput,
  };
}
