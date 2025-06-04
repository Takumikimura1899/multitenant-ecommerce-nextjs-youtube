'use client';

import { ListFilterIcon } from 'lucide-react';
import { CategoryDropdown } from './CategoryDropdown';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CategorySidebar } from './CategorySidebar';

import { useEffect, useRef, useState } from 'react';
import type { CustomCategory } from '../types';

const ACTIVE_CATEGORY_SLUG = 'all';

export const CategoryList = ({ data }: { data: CustomCategory[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategoryIndex = data.findIndex(
    (category) => category.slug === ACTIVE_CATEGORY_SLUG
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current) {
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);
      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;

        if (totalWidth + width > availableWidth) break;
        totalWidth += width;
        visible++;
      }
      setVisibleCount(visible);
    };

    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!);

    return () => resizeObserver.disconnect();
  }, [data.length]);

  return (
    <div className='relative w-full'>
      {/* Category Sidebar */}
      <CategorySidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      {/* Hidden div to measure all items */}
      <div
        ref={measureRef}
        className='absolute opacity-0 pointer-events-none flex'
        style={{ position: 'fixed', top: -9999, left: -9999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={category.slug === ACTIVE_CATEGORY_SLUG}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
      <div
        ref={containerRef}
        className='flex flex-nowrap items-center'
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={category.slug === ACTIVE_CATEGORY_SLUG}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}

        <div ref={viewAllRef} className='shrink-0'>
          <Button
            className={cn(
              'h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black',
              isActiveCategoryHidden &&
                !isAnyHovered &&
                'bg-white border-primary'
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
            <ListFilterIcon className='ml-2' />
          </Button>
        </div>
      </div>
    </div>
  );
};
