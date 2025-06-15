
import { navItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card/50 backdrop-blur-lg border-t border-border z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          
          if (item.name === 'Profile') {
            return (
              <Link key={item.name} to={item.href} className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors flex-1 p-1">
                <div className={cn("w-6 h-6 rounded-full overflow-hidden bg-card", isActive && "ring-2 ring-brand-purple")}>
                  <img src="https://i.pravatar.cc/150?u=james" alt="User avatar" className="w-full h-full object-cover" />
                </div>
                <span className={cn("text-[10px] leading-tight", isActive && "text-foreground font-semibold")}>{item.name}</span>
              </Link>
            )
          }
          return (
            <Link key={item.name} to={item.href} className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors flex-1 p-1">
              <item.icon className={cn("w-5 h-5", isActive && "text-brand-purple")} />
              <span className={cn("text-[10px] leading-tight", isActive && "text-foreground font-semibold")}>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
