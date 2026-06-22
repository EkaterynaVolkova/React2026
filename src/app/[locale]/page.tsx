import { Suspense } from 'react';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { Search } from '@/components/Search';
import { getCharacters } from '@/api/data.service';

function SearchFallback() {
  return <>Loading...</>;
}

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams.page) || 1;
  const searchQuery = resolvedSearchParams.q || '';
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['characters', currentPage, searchQuery],
    queryFn: () => getCharacters(currentPage, searchQuery),
  });

  return (
    <Suspense fallback={<SearchFallback />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Search />
      </HydrationBoundary>
    </Suspense>
  );
}
