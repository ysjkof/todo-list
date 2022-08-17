import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContext } from '../App';
import GlobalNavigationBar from './organisms/GlobalNavigationBar';

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
        className="flex w-full max-w-screen-md items-center justify-center overflow-scroll bg-white"
      >
        <Outlet />
      </div>
    </div>
  );
}
