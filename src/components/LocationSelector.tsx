
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type LocationSelectorProps = {
  onSetLocation: (location: string) => void;
};

const LocationSelector = ({ onSetLocation }: LocationSelectorProps) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSave = () => {
    if (city && country) {
      onSetLocation(`${city}, ${country}`);
    } else if (city) {
      onSetLocation(city);
    }
  };

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Set Your Location</h4>
        <p className="text-sm text-muted-foreground">
          Enter your city and country to find events near you.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="city" className="text-right">City</Label>
          <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} className="col-span-2 h-8" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="country" className="text-right">Country</Label>
          <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="col-span-2 h-8" />
        </div>
      </div>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default LocationSelector;
