import { CategoryList } from './CategoryList';
import { SearchInput } from '../SearchInput';
import type { CustomCategory } from '../types';

export const SearchFilters = ({ data }: { data: CustomCategory[] }) => {
  return (
    <div className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'>
      <SearchInput data={data} />
      <div className='hidden lg:block'>
        <CategoryList data={data} />
      </div>
    </div>
  );
};
