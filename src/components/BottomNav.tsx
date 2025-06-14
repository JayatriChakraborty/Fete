
import { navItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card/50 backdrop-blur-lg border-t border-border z-50">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const isCenterButton = item.name === 'Create';
          if (isCenterButton) {
            return (
              <Link key={item.name} to={item.href} className="flex-shrink-0">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-brand-purple to-brand-pink text-white -translate-y-6 shadow-lg shadow-brand-purple/30">
                  <item.icon className="w-8 h-8" />
                </div>
              </Link>
            )
          }
          return (
            <Link key={item.name} to={item.href} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors w-16">
              <item.icon className={cn("w-6 h-6", isActive && "text-brand-purple")} />
              <span className={cn("text-xs", isActive && "text-foreground font-semibold")}>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
