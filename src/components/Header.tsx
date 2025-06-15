
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LocationSelector from './LocationSelector';

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
    <header>
      <div>
        <h1 className="text-2xl font-bold text-white">Hello, {userName || 'User'}!</h1>
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
    </header>
  );
};

export default Header;
