import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/organisms/TodoForm';
import TodoTitleList from '../components/organisms/TodoTitleList';
import TodoContent from '../components/molecules/TodoContent';
import { toLocaleStringFromStringDate } from '../utils/todoUtils';
import useTodo from '../hooks/useTodo';
import Button from '../components/atom/Button';

export default function TodoList() {
  const navigation = useNavigate();
  const {
    todoToBeModified,
    mode,
    todoList,
    selectedTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleEditOrView,
    toggleCreateOrView,
  } = useTodo();

  const showTotoDetail = async (todoId: string) => {
    navigation(`/${todoId}`);
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden p-2">
      <div className="flex h-8 justify-end pb-1">
        <Button onClick={toggleCreateOrView} width="lg">
          {mode === 'create' ? '취소' : '새로 만들기'}
        </Button>
      </div>
      <div
        className="grid grid-cols-[40%,_1fr] divide-x border"
        style={{ height: 'calc(100% - 2rem)' }}
      >
        <div className="w-full overflow-y-scroll pb-4">
          {todoList?.todos?.map((todo) => (
            <TodoTitleList
              key={todo.id}
              id={todo.id}
              title={todo.title}
              isSelect={todo.id === selectedTodo?.todo?.id}
              isModified={todoToBeModified?.id === todo.id}
              showTotoDetail={() => showTotoDetail(todo.id)}
              toggleUpdateInput={() => toggleEditOrView(todo)}
              deleteTodo={() => deleteTodo(todo.id)}
            />
          ))}
        </div>
        <div className="flex flex-col justify-between overflow-hidden">
          {mode === 'view' && selectedTodo?.todo && (
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
          {mode === 'edit' && (
            <TodoForm
              actionName="수정"
              submitCallback={updateTodo}
              todoToBeModified={todoToBeModified}
            />
          )}
          {mode === 'create' && (
            <TodoForm actionName="저장" submitCallback={createTodo} />
          )}
        </div>
      </div>
    </div>
  );
}
