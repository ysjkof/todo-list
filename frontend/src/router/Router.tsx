import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../App';
import Layout from '../components/Layout';
import Auth from '../pages/auth';
import TodoList from '../pages/TodoList';
import ProtectRoute from './ProtectRoute';

export default function Router() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectRoute
                isPass={isLoggedIn}
                goWhenFail={'/auth'}
                alarm="로그인해주세요"
              >
                <TodoList />
              </ProtectRoute>
            }
          />
          <Route path=":todoId" element={<TodoList />} />
          <Route
            path="auth"
            element={
              <ProtectRoute isPass={!isLoggedIn} goWhenFail={'/'}>
                <Auth />
              </ProtectRoute>
            }
          />
        </Route>
        <Route path="*" element={<p>없는 주소입니다.</p>} />
      </Routes>
    </BrowserRouter>
  );
}
