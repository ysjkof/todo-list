import { useContext, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext, ToastContext } from '../App';
import { removeUserToken } from '../services/authServices';
import Button from './atom/Button';

function GlobalNavigationBar() {
  const { changeLoggedIn } = useContext(AuthContext);

  const invokeLogout = () => {
    removeUserToken();
    changeLoggedIn(false);
  };
  return (
    <div
      className="flex w-full max-w-screen-md items-center justify-between border-b bg-white px-2 text-lg"
      style={{ height: 40 }}
    >
      <Link to="/">Home</Link>
      <Button className="" onClick={invokeLogout}>
        Logout
      </Button>
    </div>
  );
}

export default function Layout() {
  const { message, setMessage, Toast } = useContext(ToastContext);
  const location = useLocation();
  const state = location.state as { alarm: string };

  useEffect(() => {
    if (!message) return;
    setTimeout(() => setMessage(''), 3000);
  }, [message]);

  useEffect(() => {
    if (state?.alarm) {
      setMessage(state.alarm);
    }
  }, [state]);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-gray-100">
      {message && <Toast message={message} />}
      <GlobalNavigationBar />
      <div
        style={{ height: 'calc(100% - 40px)' }}
        className="w-full max-w-screen-md bg-white"
      >
        <Outlet />
      </div>
    </div>
  );
}
