import { Footer } from './Footer';
import { Navbar } from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-1 bg-[#f4f4f0]'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
