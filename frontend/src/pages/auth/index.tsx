import Login from './Login';
import SignUp from './SignUp';

export default function Auth() {
  let userToken = null;

  if (userToken) return <></>;
  return (
    <div className="flex h-full flex-col gap-16 pt-10">
      <Login />
      <SignUp />
    </div>
  );
}
