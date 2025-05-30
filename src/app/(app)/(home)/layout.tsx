import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { SearchFilters } from './SearchFilters';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Category } from '@/payload-types';
import type { CustomCategory } from './types';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: 'categories',
    depth: 1,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined,
    })),
  })) satisfies CustomCategory[];
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className='flex-1 bg-[#f4f4f0]'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
