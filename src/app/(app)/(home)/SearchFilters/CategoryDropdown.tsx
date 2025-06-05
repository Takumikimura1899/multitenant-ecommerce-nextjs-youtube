'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { Category } from '@/payload-types';
import { useRef, useState } from 'react';
import { useDropdownPosition } from '../useDropdownPosition';
import Link from 'next/link';
import type { CategoriesGetManyOutput } from '@/modules/categories/types';

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: {
  category: CategoriesGetManyOutput[number];
  isActive?: boolean;
  isNavigationHovered?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className='relative'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={dropdownRef}
    >
      <div className='relative'>
        <Button
          variant='elevated'
          className={cn(
            'h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black',
            isActive && !isNavigationHovered && 'bg-white border-primary',
            isOpen &&
              'bg-white border-primary hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[4px]'
          )}
        >
          <Link href={`/${category.slug === 'all' ? '' : category.slug}`}>
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              'opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2',
              isOpen && 'opacity-100'
            )}
          />
        )}
      </div>

      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={getDropdownPosition()}
      />
    </div>
  );
};

const SubcategoryMenu = ({
  category,
  isOpen,
  position,
}: {
  category: CategoriesGetManyOutput[number];
  isOpen: boolean;
  position: { top: number; left: number };
}) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || '#f5f5f5';
  return (
    <div
      className='fixed z-100'
      style={{ top: position.top, left: position.left }}
    >
      <div className='h-3 w-60' />
      <div
        style={{ backgroundColor }}
        className='w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]'
      >
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className='w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium'
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
