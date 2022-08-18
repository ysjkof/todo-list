import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { removeUserToken } from '../../services/authServices';
import { AuthContext } from '../../store';
import Button from '../atom/Button';

export default function GlobalNavigationBar() {
  const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);

  const invokeLogout = () => {
    removeUserToken();
    setIsLoggedIn(false);
  };
  if (!isLoggedIn) return <></>;
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
