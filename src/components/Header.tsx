
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LocationSelector from './LocationSelector';
import { Button } from './ui/button';

type HeaderProps = {
  location: string | null;
  onSetLocation: (location: string) => void;
};

const Header = ({ location, onSetLocation }: HeaderProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleLocationSet = (newLocation: string) => {
    onSetLocation(newLocation);
    setIsPopoverOpen(false);
  }

  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-white">Hello, James!</h1>
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
      <div>
        <Link to="/connections">
          <Button variant="ghost" size="icon">
            <Heart className="h-6 w-6 text-white" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
