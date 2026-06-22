import { Suspense } from 'react';
import { Search } from '@/components/Search';

function SearchFallback() {
  return <>Loading...</>;
}

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    query?: string;
    q?: string;
    id?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <Suspense fallback={<SearchFallback />}>
      <Search searchParams={resolvedSearchParams} />
    </Suspense>
  );
}
