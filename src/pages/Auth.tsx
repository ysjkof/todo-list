import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalToken } from '../utils/authUtils';
import Login from '../components/organisms/Login';
import SignUp from '../components/organisms/SignUp';

export default function Auth() {
  const navigation = useNavigate();

  useEffect(() => {
    if (getLocalToken()) {
      alert('로그인 중이라 첫 화면으로 이동합니다');
      navigation('/');
    }
  }, []);

  return getLocalToken() ? (
    <></>
  ) : (
    <div className="flex flex-col pt-10 h-full gap-16">
      <Login />
      <SignUp />
    </div>
  );
}
