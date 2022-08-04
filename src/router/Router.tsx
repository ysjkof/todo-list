import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import TodoList from '../pages/TodoList';

const Auth = [<Login />, <SignUp />];

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="auth" element={Auth} />
      </Routes>
    </BrowserRouter>
  );
}
