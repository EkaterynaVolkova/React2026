import { ErrorBoundary } from '@components/ErrorBoundary';
import { Search } from './pages/Search';
import { Route, Routes } from 'react-router';
import { NotFound } from './pages/NotFound';
import { About } from './pages/About';
import { Layout } from '@components/Layout';
import { CharacterDetails } from '@components/CharacterDetails';
import { ThemeProvider } from './context/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CACHE_TTL } from './constants/global';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: CACHE_TTL,
      gcTime: CACHE_TTL * 2,
    },
  },
});

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="" element={<Search />}>
                  <Route path="" element={<CharacterDetails />} />
                </Route>

                <Route path="about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </ThemeProvider>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </QueryClientProvider>
    </>
  );
};

export default App;
