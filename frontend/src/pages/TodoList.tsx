import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/organisms/TodoForm';
import TodoTitleList from '../components/organisms/TodoTitleList';
import TodoContent from '../components/molecules/TodoContent';
import { toLocaleStringFromStringDate } from '../utils/todoUtils';
import useTodo from '../hooks/useTodo';

export default function TodoList() {
  const navigation = useNavigate();
  const {
    hasUpdateInput,
    todoToBeModified,
    todoList,
    selectedTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleUpdateInput,
  } = useTodo();

  const showTotoDetail = async (todoId: string) => {
    navigation(`/${todoId}`);
  };

  return (
    <div className="relative flex w-full max-w-screen-md flex-col gap-4">
      {hasUpdateInput ? (
        <TodoForm
          actionName="수정"
          submitCallback={updateTodo}
          todoToBeModified={todoToBeModified}
        />
      ) : (
        <TodoForm actionName="저장" submitCallback={createTodo} />
      )}
      <div className="flex border border-red-400">
        <div className="w-full">
          <h2>목록</h2>
          {todoList?.todos?.map((todo) => (
            <TodoTitleList
              key={todo.id}
              id={todo.id}
              title={todo.title}
              isModified={hasUpdateInput && todoToBeModified?.id === todo.id}
              showTotoDetail={() => showTotoDetail(todo.id)}
              toggleUpdateInput={() => toggleUpdateInput(todo)}
              deleteTodo={() => deleteTodo(todo.id)}
            />
          ))}
        </div>
        <div className="flex w-full flex-col">
          <h2>상세</h2>
          {selectedTodo && selectedTodo.todo && (
            <TodoContent
              createdAt={toLocaleStringFromStringDate(
                selectedTodo.todo.createdAt
              )}
              updatedAt={toLocaleStringFromStringDate(
                selectedTodo.todo.updatedAt
              )}
              title={selectedTodo.todo.title}
              content={selectedTodo.todo.content}
            />
          )}
        </div>
      </div>
    </div>
  );
}
