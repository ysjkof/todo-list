import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getLocalToken, removeLocalToken } from '../utils/authUtils';

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(getLocalToken());
  const navigation = useNavigate();

  useEffect(() => {
    if (isLoggedIn) return;
    alert('로그인이 유효하지 않습니다. 로그인 페이지로 이동합니다.');
    navigation('/auth');
  }, [isLoggedIn]);

  const invokeLogout = () => {
    removeLocalToken();
    setIsLoggedIn(null);
  };

  return (
    <div>
      <button onClick={invokeLogout}>Logout</button>
      <Outlet />
    </div>
  );
}
