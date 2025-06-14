
import BottomNav from './BottomNav';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-background min-h-screen flex justify-center font-sans">
      <div className="w-full max-w-sm relative bg-background flex flex-col">
        <main className="flex-grow pb-24">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;
