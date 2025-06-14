
import BottomNav from './BottomNav';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const showBottomNav = !location.pathname.startsWith('/event/');

  return (
    <div className="bg-background min-h-screen flex justify-center font-sans">
      <div className="w-full max-w-sm relative bg-background flex flex-col">
        <main className={cn("flex-grow", showBottomNav && "pb-24")}>
          {children}
        </main>
        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
};

export default Layout;
