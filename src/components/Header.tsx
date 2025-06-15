
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LocationSelector from './LocationSelector';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  userName: string | null | undefined;
  location: string | null;
  onSetLocation: (location: string) => void;
};

const Header = ({ userName, location, onSetLocation }: HeaderProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleLocationSet = (newLocation: string) => {
    onSetLocation(newLocation);
    setIsPopoverOpen(false);
  }

  return (
    <header className="flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${userName || 'user'}`} alt={userName || 'user'} />
          <AvatarFallback>{userName ? userName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-white">Hi, {userName || 'User'}!</h1>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <button className="text-sm text-muted-foreground hover:text-white transition-colors text-left p-0 border-none bg-transparent focus:outline-none focus-visible:ring-0">
                {location || "Add Your Location"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <LocationSelector onSetLocation={handleLocationSet} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/explore">
                <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile">
                <Heart className="h-5 w-5" />
            </Link>
          </Button>
      </div>
    </header>
  );
};

export default Header;
