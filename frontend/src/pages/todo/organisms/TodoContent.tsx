import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import todoController from '../../../controller/todoController';
import { todoKeys } from '../../../hooks/useTodo';
import { toLocaleStringFromStringDate } from '../../../services/todoServices';

export default function TodoContent() {
  const param = useParams();

  const { data: selectedTodo } = useQuery(
    todoKeys.detail(param.todoId!),
    () => todoController.getTodoById({ id: param.todoId! }),
    { enabled: !!param.todoId }
  );

  return (
    <div className="flex h-full w-full flex-col p-2">
      {selectedTodo ? (
        <>
          <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-extrabold">
            {selectedTodo.todo.title}
          </h3>
          <span className="text-xs text-gray-500">
            생성: {toLocaleStringFromStringDate(selectedTodo.todo.createdAt!)}
          </span>
          <span className="text-xs text-gray-500">
            수정: {toLocaleStringFromStringDate(selectedTodo.todo.updatedAt!)}
          </span>
          <p
            className="overflow-y-scroll p-2"
            style={{ height: 'calc(100% - 4rem)' }}
          >
            {selectedTodo.todo.content}
          </p>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
