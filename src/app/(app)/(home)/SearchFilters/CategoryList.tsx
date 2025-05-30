import type { Category } from '@/payload-types';
import { CategoryDropdown } from './CategoryDropdown';
import type { CustomCategory } from '../types';

export const CategoryList = ({ data }: { data: CustomCategory[] }) => {
  return (
    <div className='relative w-full'>
      <div className='flex flex-nowrap items-center'>
        {data.map((category) => (
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
