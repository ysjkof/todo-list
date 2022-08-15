import { createContext, useState } from 'react';
import Router from './router/Router';
import { getUserToken } from './services/authServices';
import './styles/tailwind.css';

export const AuthContext = createContext({
  isLoggedIn: false,
  changeLoggedIn: (value: boolean) => {},
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getUserToken());
  const changeLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        changeLoggedIn,
      }}
    >
      <Router />
    </AuthContext.Provider>
  );
}

export default App;
