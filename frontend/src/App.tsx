import { createContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router/Router';
import { getUserToken } from './services/authServices';
import './styles/tailwind.css';
import Toast from './components/atom/Toast';

export const AuthContext = createContext({
  isLoggedIn: false,
  changeLoggedIn: (value: boolean) => {},
});

export const ToastContext = createContext({
  message: '',
  Toast,
  setMessage: (textContent: string) => {},
});

export const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getUserToken());
  const changeLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };

  const [message, setMessage] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          changeLoggedIn,
        }}
      >
        <ToastContext.Provider value={{ message, Toast, setMessage }}>
          <Router />
        </ToastContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
