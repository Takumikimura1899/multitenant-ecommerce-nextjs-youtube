import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { trpc } from '@/trpc/client';
import type { CategoriesGetManyOutput } from '@/modules/categories/types';

export const CategorySidebar = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { data } = trpc.categories.getMany.useQuery();

  const [parentCategories, setParentCategories] = useState<
    CategoriesGetManyOutput[number]['subcategories'] | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoriesGetManyOutput[number] | null
  >(null);
  const router = useRouter();

  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  };

  const handleCategoryClick = (
    category:
      | CategoriesGetManyOutput[number]
      | CategoriesGetManyOutput[number]['subcategories'][number]
  ) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories || null);
      setSelectedCategory(category as CategoriesGetManyOutput[number]);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === 'all') {
          router.push('/');
        } else {
          router.push(`/${category.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  const backgroundColor = selectedCategory?.color || 'white';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side='left'
        className='p-0 transition-none'
        style={{ backgroundColor }}
      >
        <SheetHeader className='p-4 border-b'>
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className='flex flex-col overflow-auto h-full pb-2'>
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'
            >
              <ChevronLeftIcon className='size-4 mr-2' />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className='w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer'
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className='size-4' />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
