
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { myEvents, upcomingEvents, moreEvents, users, organizations, Event } from '@/lib/data';
import { Calendar, Building, User as UserIcon } from 'lucide-react';

type SearchCommandProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type User = {
  id: number;
  name: string;
  avatar: string;
};

type Organization = {
  id: number;
  name: string;
  avatar: string;
}

const allEventsData = [...myEvents, ...upcomingEvents, ...moreEvents];
const uniqueEvents = Array.from(new Map(allEventsData.map(event => [event.id, event])).values());

const SearchCommand = ({ open, setOpen }: SearchCommandProps) => {
  const navigate = useNavigate();

  const runCommand = (command: () => unknown) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search for events, organizations, or hosts..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Events">
          {uniqueEvents.map((event: Event) => (
            <CommandItem
              key={`event-${event.id}`}
              value={`event ${event.title} ${event.location}`}
              onSelect={() => runCommand(() => navigate(`/event/${event.id}`))}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>{event.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        
        {organizations && organizations.length > 0 && (
          <CommandGroup heading="Organizations">
            {(organizations as Organization[]).map((org: Organization) => (
              <CommandItem
                key={`org-${org.id}`}
                value={`organization ${org.name}`}
                onSelect={() => setOpen(false)}
              >
                <Building className="mr-2 h-4 w-4" />
                <span>{org.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        
        {users && users.length > 0 && (
          <CommandGroup heading="Hosts">
            {(users as User[]).map((user: User) => (
              <CommandItem
                key={`user-${user.id}`}
                value={`host ${user.name}`}
                onSelect={() => setOpen(false)}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                <span>{user.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
