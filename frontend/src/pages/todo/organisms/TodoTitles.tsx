import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TodoTitleList from './TodoTitleList';
import todoController from '../../../controller/todoController';
import { todoKeys } from '../../../hooks/useTodo';
import { Todo } from '../../../types/todoType';

interface TodoTitlesProps {
  toBeModify: Todo | null;
  showTodoDetail: (todoId: string) => void;
  toggleEditOrView: (todo: Todo) => void;
  deleteTodo: (todoId: string) => void;
}
export default function TodoTitles({
  toBeModify,
  showTodoDetail,
  toggleEditOrView,
  deleteTodo,
}: TodoTitlesProps) {
  const param = useParams();
  const { data: todoList } = useQuery(todoKeys.lists, () =>
    todoController.getTodos()
  );
  const [selectedTodoId, setSelectedTodoId] = useState('');

  const checkSelected = () => {
    if (param.todoId !== selectedTodoId) {
      const todoId = todoList?.todos.find(
        (todo) => todo.id === param.todoId
      )?.id;

      setSelectedTodoId(todoId || '');
    }
  };

  useEffect(() => {
    checkSelected();
  }, [param]);

  return (
    <div className="w-full overflow-y-scroll pb-4">
      {todoList?.todos?.map((todo) => (
        <TodoTitleList
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isSelect={todo.id === selectedTodoId}
          isModified={toBeModify?.id === todo.id}
          showTodoDetail={() => showTodoDetail(todo.id)}
          toggleEditOrView={() => toggleEditOrView(todo)}
          deleteTodo={() => deleteTodo(todo.id)}
        />
      ))}
    </div>
  );
}
