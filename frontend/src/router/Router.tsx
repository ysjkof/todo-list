import { ReactNode, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../App';
import Layout from '../components/Layout';
import Auth from '../pages/auth';
import TodoList from '../pages/TodoList';

export default function Router() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute
              isPass={isLoggedIn}
              goWhenFail={'/auth'}
              alarm="로그인해주세요"
            >
              <Layout />
            </ProtectRoute>
          }
        >
          <Route index element={<TodoList />} />
          <Route path=":todoId" element={<TodoList />} />
        </Route>
        <Route
          path="auth"
          element={
            <ProtectRoute isPass={!isLoggedIn} goWhenFail={'/'}>
              <Auth />
            </ProtectRoute>
          }
        />
        <Route path="*" element={<p>없는 주소입니다.</p>} />
      </Routes>
    </BrowserRouter>
  );
}

interface ProtectRouteProps {
  isPass: boolean;
  children: ReactNode;
  goWhenFail: string;
  alarm?: string;
}

function ProtectRoute({
  isPass,
  children,
  goWhenFail,
  alarm,
}: ProtectRouteProps) {
  const handleFailPass = () => {
    if (alarm) {
      alert(`이동할 수 없는 주소(URL)입니다. ${alarm}`);
    }
    return Navigate({ to: goWhenFail });
  };
  return isPass ? <>{children}</> : handleFailPass();
}
