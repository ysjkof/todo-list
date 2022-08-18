import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import TodoList from '../pages/TodoList';
import { AuthContext } from '../store';
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
                goWhenFail={'/auth/login'}
                alarm="로그인해주세요"
              >
                <TodoList />
              </ProtectRoute>
            }
          />
          <Route
            path=":todoId"
            element={
              <ProtectRoute
                isPass={isLoggedIn}
                goWhenFail={'/auth/login'}
                alarm="로그인해주세요"
              >
                <TodoList />
              </ProtectRoute>
            }
          />
          <Route
            path="auth"
            element={<ProtectRoute isPass={false} goWhenFail="/auth/login" />}
          />
          <Route
            path="auth/login"
            element={
              <ProtectRoute isPass={!isLoggedIn} goWhenFail="/">
                <Login />
              </ProtectRoute>
            }
          />
          <Route
            path="auth/create"
            element={
              <ProtectRoute isPass={!isLoggedIn} goWhenFail="/">
                <SignUp />
              </ProtectRoute>
            }
          />
          <Route path="*" element={<p>없는 주소입니다.</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
