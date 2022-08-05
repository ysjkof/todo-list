import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Auth from '../pages/Auth';
import TodoList from '../pages/TodoList';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TodoList />} />
        </Route>
        <Route path="auth" element={<Auth />} />
        <Route path="*" element={<p>없는 주소입니다.</p>} />
      </Routes>
    </BrowserRouter>
  );
}
