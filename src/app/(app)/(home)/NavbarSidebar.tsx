import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const linkClassName = cn(
  'w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium'
);

export const NavbarSidebar = ({
  items,
  open,
  onOpenChange,
}: {
  items: { href: string; children: React.ReactNode }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='left' className='p-0 transition-none'>
        <SheetHeader className='p-4 border-b'>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className='flex flex-col overflow-auto h-full pb-2'>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className={linkClassName}
            >
              {item.children}
            </Link>
          ))}
          <div className='border-t'>
            <Link
              href='/sign-in'
              onClick={() => onOpenChange(false)}
              className={linkClassName}
            >
              Log in
            </Link>
            <Link
              href='/sign-up'
              onClick={() => onOpenChange(false)}
              className={linkClassName}
            >
              Start selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
