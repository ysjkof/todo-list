import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../App';
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
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-gray-100">
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
