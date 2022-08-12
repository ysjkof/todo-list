import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUserToken, removeUserToken } from '../services/authServices';

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(getUserToken());
  const navigation = useNavigate();

  useEffect(() => {
    if (isLoggedIn) return;
    alert('로그인이 유효하지 않습니다. 로그인 페이지로 이동합니다.');
    navigation('/auth');
  }, [isLoggedIn]);

  const invokeLogout = () => {
    removeUserToken();
    setIsLoggedIn(null);
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