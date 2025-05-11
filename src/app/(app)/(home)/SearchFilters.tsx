import { CategoryList } from './CategoryList';
import { SearchInput } from './SearchInput';

export const SearchFilters = ({ data }: { data: any }) => {
  return (
    <div className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'>
      <SearchInput disabled={false} />
      <CategoryList data={data} />
    </div>
  );
};
