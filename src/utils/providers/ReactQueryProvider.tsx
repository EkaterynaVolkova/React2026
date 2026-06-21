'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CACHE_TTL } from '@/constants/global';

const globalQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: CACHE_TTL,
      gcTime: CACHE_TTL * 2,
    },
  },
});

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={globalQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
