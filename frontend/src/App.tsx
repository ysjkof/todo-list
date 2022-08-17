import { createContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from './router/Router';
import { getUserToken } from './services/authServices';
import './styles/tailwind.css';

export const AuthContext = createContext({
  isLoggedIn: false,
  changeLoggedIn: (value: boolean) => {},
});
export const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getUserToken());
  const changeLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          changeLoggedIn,
        }}
      >
        <Router />
      </AuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
