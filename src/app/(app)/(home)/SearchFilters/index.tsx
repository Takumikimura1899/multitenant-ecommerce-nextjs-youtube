'use client';

import { CategoryList } from './CategoryList';
import { SearchInput } from '../SearchInput';
import { trpc } from '@/trpc/client';

export const SearchFilters = () => {
  const [data] = trpc.categories.getMany.useSuspenseQuery();
  return (
    <div
      className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'
      style={{
        backgroundColor: '#f5f5f5',
      }}
    >
      <SearchInput />
      <div className='hidden lg:block'>
        <CategoryList data={data} />
      </div>
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'
      style={{
        backgroundColor: '#f5f5f5',
      }}
    >
      <SearchInput disabled />
      <div className='hidden lg:block'>
        <div className='h-11' />
      </div>
    </div>
  );
};
