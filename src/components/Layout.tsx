
import BottomNav from './BottomNav';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  if (isAuthPage) {
    return <>{children}</>;
  }

  const showBottomNav = !location.pathname.startsWith('/event/');
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
      toast({ title: "Logged out successfully." });
    } catch (error) {
      toast({ title: "Logout failed", description: "Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="bg-background min-h-screen flex justify-center font-sans">
      <div className="w-full max-w-sm relative bg-background flex flex-col">
        {currentUser && location.pathname === '/profile' && (
          <div className="absolute top-4 right-4 z-10">
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}
        <main className={cn("flex-grow", showBottomNav && "pb-24")}>
          {children}
        </main>
        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
};

export default Layout;
