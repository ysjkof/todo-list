import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../App';
import { removeUserToken } from '../services/authServices';

export default function Layout() {
  const { changeLoggedIn } = useContext(AuthContext);

  const invokeLogout = () => {
    removeUserToken();
    changeLoggedIn(false);
  };

  return (
    <div className="relative flex h-screen items-center justify-center">
      <button className="absolute right-10 top-4" onClick={invokeLogout}>
        Logout
      </button>
      <Outlet />
    </div>
  );
}
