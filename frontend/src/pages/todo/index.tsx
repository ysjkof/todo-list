import TodoContent from './organisms/TodoContent';
import useTodo from '../../hooks/useTodo';
import TodoTitles from './organisms/TodoTitles';
import { Suspense } from 'react';
import CreateTodo from './organisms/CreateTodo';
import ModifyTodo from './organisms/ModifyTodo';
import TodoNavigationBar from './organisms/TodoNavigationBar';
import Spinner from '../../components/atom/Spinner';

export default function TodoList() {
  const {
    mode,
    toBeModify,
    changeModeToView,
    setToBeModify,
    toggleCreateOrView,
    showTodoDetail,
    toggleEditOrView,
    deleteTodo,
  } = useTodo();

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden p-2">
      <TodoNavigationBar mode={mode} toggleCreateOrView={toggleCreateOrView} />
      <div
        className="grid grid-cols-[40%,_1fr] divide-x border"
        style={{ height: 'calc(100% - 2rem)' }}
      >
        <Suspense fallback={<Spinner />}>
          <TodoTitles
            showTodoDetail={showTodoDetail}
            toggleEditOrView={toggleEditOrView}
            deleteTodo={deleteTodo}
            toBeModify={toBeModify}
          />
        </Suspense>
        <div className="flex flex-col justify-between overflow-hidden">
          {mode === 'view' ? (
            <Suspense fallback={<Spinner />}>
              <TodoContent />
            </Suspense>
          ) : mode === 'edit' ? (
            <ModifyTodo
              changeModeToView={changeModeToView}
              setToBeModify={setToBeModify}
              toBeModify={toBeModify}
            />
          ) : mode === 'create' ? (
            <CreateTodo changeModeToView={changeModeToView} />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
