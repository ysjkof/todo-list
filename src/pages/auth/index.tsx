import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserToken } from '../../services/authServices';
import Login from './Login';
import SignUp from './SignUp';

export default function Auth() {
  const navigation = useNavigate();
  let userToken = null;

  useEffect(() => {
    userToken = getUserToken();

    if (userToken) {
      alert('로그인 중이라 첫 화면으로 이동합니다');
      navigation('/');
    }
  }, []);

  if (userToken) return <></>;
  return (
    <div className="flex h-full flex-col gap-16 pt-10">
      <Login />
      <SignUp />
    </div>
  );
}
