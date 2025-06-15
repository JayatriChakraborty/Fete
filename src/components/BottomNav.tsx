
import { navItems, moreNavItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BottomNav = () => {
  const location = useLocation();

  const moreNavPaths = moreNavItems.map(item => item.href);
  const isMoreActive = moreNavPaths.includes(location.pathname);

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card/50 backdrop-blur-lg border-t border-border z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href} className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors flex-1 p-1 h-full">
              <item.icon className={cn("w-5 h-5", isActive && "text-brand-purple")} />
              <span className={cn("text-[10px] leading-tight", isActive && "text-foreground font-semibold")}>{item.name}</span>
            </Link>
          )
        })}
        
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors flex-1 p-1 h-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:text-foreground">
              <MoreHorizontal className={cn("w-5 h-5", isMoreActive && "text-brand-purple")} />
              <span className={cn("text-[10px] leading-tight", isMoreActive && "text-foreground font-semibold")}>More</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="center" className="mb-2 w-56 bg-card/80 backdrop-blur-lg border-border text-foreground">
            {moreNavItems.map(item => {
              const isActive = location.pathname === item.href;

              if (item.name === 'Profile') {
                return (
                  <DropdownMenuItem key={item.name} className="p-0 focus:bg-accent/50">
                    <Link to={item.href} className="flex items-center gap-3 w-full px-3 py-2">
                      <div className={cn("w-6 h-6 rounded-full overflow-hidden bg-card", isActive && "ring-2 ring-brand-purple")}>
                        <img src="https://i.pravatar.cc/150?u=james" alt="User avatar" className="w-full h-full object-cover" />
                      </div>
                      <span className={cn("font-medium", isActive && "text-brand-purple")}>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                )
              }

              return (
                <DropdownMenuItem key={item.name} className="p-0 focus:bg-accent/50">
                  <Link to={item.href} className="flex items-center gap-3 w-full px-3 py-2">
                    <item.icon className={cn("w-5 h-5 text-muted-foreground", isActive && "text-brand-purple")} />
                    <span className={cn("font-medium", isActive && "text-brand-purple")}>{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </nav>
  );
};

export default BottomNav;
