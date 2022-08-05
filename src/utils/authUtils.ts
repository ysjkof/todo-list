import { TOKEN_KEY } from '../constants/localStorageKeys';

export const getLocalToken = () => localStorage.getItem(TOKEN_KEY);
export const removeLocalToken = () => localStorage.removeItem(TOKEN_KEY);
