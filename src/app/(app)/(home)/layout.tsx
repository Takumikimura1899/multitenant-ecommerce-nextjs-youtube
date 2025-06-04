import { HydrateClient, trpc } from '@/trpc/server';

import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { SearchFilters, SearchFiltersSkeleton } from './SearchFilters';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  void trpc.categories.getMany.prefetch();
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<SearchFiltersSkeleton />}>
            <SearchFilters />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
      <div className='flex-1 bg-[#f4f4f0]'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
