import { Search } from '@/components/Search';
import { Suspense } from 'react';

function SearchFallback() {
  return <>Loading...</>;
}

export default function Page() {
  return (
    <>
      <Suspense fallback={<SearchFallback />}>
        <Search />
      </Suspense>
    </>
  );
}
