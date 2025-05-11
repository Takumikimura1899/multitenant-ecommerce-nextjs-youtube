import type { Category } from '@/payload-types';
import { CategoryDropdown } from './CategoryDropdown';

export const CategoryList = ({ data }: { data: any }) => {
  return (
    <div className='relative w-full'>
      <div className='flex flex-nowrap items-center'>
        {data.map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
