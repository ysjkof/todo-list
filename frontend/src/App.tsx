import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import Router from './router/Router';
import { getUserToken } from './services/authServices';
import './styles/tailwind.css';
import Toast from './components/atom/Toast';
import { AuthContext, queryClient, ToastContext } from './store';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getUserToken());
  const [message, setMessage] = useState('');

  queryClient.setDefaultOptions({
    queries: {
      retry: 0,
      onError(err) {
        setMessage(`${err}`);
      },
      suspense: true,
    },
    mutations: {
      retry: 0,
      onError(error) {
        setMessage(`${error}`);
      },
    },
  });

  return (
    <ToastContext.Provider value={{ message, Toast, setMessage }}>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </AuthContext.Provider>
    </ToastContext.Provider>
  );
}

export default App;
