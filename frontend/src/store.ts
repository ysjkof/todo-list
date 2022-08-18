import { QueryClient } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import Toast from './components/atom/Toast';

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
});

export const ToastContext = createContext({
  message: '',
  Toast,
  setMessage: (textContent: string) => {},
});

export const queryClient = new QueryClient();
