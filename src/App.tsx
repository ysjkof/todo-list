import Router from './router/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/tailwind.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
