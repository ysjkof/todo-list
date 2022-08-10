import { useEffect, useState } from 'react';
import {
  createTodoMutation,
  deleteTodoMutation,
  getTodoById,
  getTodos,
  updateTodoMutation,
} from '../controller/todoController';
import { CreateTodoInputDto, UpdateTodoInputDto } from '../types/dtos/todoDto';
import { Todo } from '../types/todoType';
import { changeValueInArray, removeItemInArrayByIndex } from '../utils/utils';

export default function useTodo() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [hasUpdateInput, setHasUpdateInput] = useState(false);
  const [todoToBeModified, setTodoToBeModified] = useState<Todo | null>(null);

  const isSelectedTodo = (id: string) => todo?.id === id;
  const isToBeModifiedTod = (id: string) => todoToBeModified?.id === id;

  const getTodoAll = async () => {
    const todos = await getTodos();
    setTodoList(todos.data || []);
  };

  const getTodo = async (todoId: string, doWhenYouFail: () => void) => {
    const data = await getTodoById({ id: todoId });
    if (!data.data) {
      alert('todo를 찾을 수 없습니다');
      doWhenYouFail();
      return;
    }
    setTodo(data.data);
  };

  const addToTodoList = (newTodo: Todo) => {
    setTodoList((prevState) => [...prevState, newTodo]);
  };
  const createTodo = async ({ title, content }: CreateTodoInputDto) => {
    const createdTodo = await createTodoMutation({ content, title });
    if (!createdTodo.data) return alert('Todo 만들기를 실패했습니다');
    addToTodoList(createdTodo.data);
  };

  const updateToTodoList = (updateTodo: Todo) => {
    setTodoList((prevState) => {
      const idx = prevState.findIndex((todo) => todo.id === updateTodo.id);
      if (idx === -1)
        throw new Error('Todo 수정 후 업데이트 중 기존 자료를 찾지 못했습니다');

      return changeValueInArray(prevState, updateTodo, idx);
    });

    setTodo(updateTodo);
    setTodoToBeModified(null);
    setHasUpdateInput(false);
  };

  const updateTodo = async ({ id, title, content }: UpdateTodoInputDto) => {
    const updatedTodo = await updateTodoMutation({ id, content, title });
    if (!updatedTodo.data) return alert('Todo 업데이트를 실패했습니다');
    updateToTodoList(updatedTodo.data);
  };

  const deleteTodoFromTodoList = async (id: string) => {
    setTodoList((prevState) => {
      const idx = prevState.findIndex((todo) => todo.id === id);
      if (idx === -1)
        throw new Error('Todo 삭제 후 업데이트 중 기존 자료를 찾지 못했습니다');
      return removeItemInArrayByIndex(idx, prevState);
    });

    if (isSelectedTodo(id)) setTodo(null);
    if (isToBeModifiedTod(id)) {
      setTodoToBeModified(null);
      setHasUpdateInput(false);
    }
  };
  const deleteTodo = async (id: string) => {
    const result = await deleteTodoMutation({ id });
    if (result.data) alert('todo 삭제에 실패했습니다');
    deleteTodoFromTodoList(id);
  };

  const clearTodo = () => {
    todo && setTodo(null);
  };

  const toggleUpdateInput = (todo: Todo) => {
    if (todo && todo.id !== todoToBeModified?.id) {
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
    todo,
    getTodo,
    clearTodo,
    toggleUpdateInput,
  };
}
