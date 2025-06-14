
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Event } from '@/lib/data';

// Extend Event type to include custom RSVP question
export type UserEvent = Event & {
  rsvpQuestion?: string;
};

type AddUserEventParams = Omit<UserEvent, 'id' | 'organizer' | 'ticketsSold' | 'totalTickets' | 'category' | 'isPrivate'> & { isPrivate?: boolean };

type UserEventsContextType = {
  userEvents: UserEvent[];
  addUserEvent: (event: AddUserEventParams) => void;
};

const UserEventsContext = createContext<UserEventsContextType | undefined>(undefined);

export const UserEventsProvider = ({ children }: { children: ReactNode }) => {
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);

  useEffect(() => {
    try {
      const storedUserEvents = localStorage.getItem('userEvents');
      if (storedUserEvents) {
        setUserEvents(JSON.parse(storedUserEvents));
      }
    } catch (error) {
      console.error("Error reading user events from localStorage", error);
    }
  }, []);

  const updateAndStore = (newUserEvents: UserEvent[]) => {
    setUserEvents(newUserEvents);
    localStorage.setItem('userEvents', JSON.stringify(newUserEvents));
  };

  const addUserEvent = (eventData: AddUserEventParams) => {
    const completeEventData: Omit<UserEvent, 'id' | 'organizer' | 'ticketsSold' | 'totalTickets' | 'category'> = {
        ...eventData,
        isPrivate: eventData.isPrivate ?? false,
    };
    const newEvent: UserEvent = {
      ...completeEventData,
      id: Date.now(), // simple unique id
      category: 'User Created',
      organizer: { // dummy organizer for now
        name: 'You',
        avatarUrl: 'https://github.com/shadcn.png'
      },
      ticketsSold: 0,
      totalTickets: eventData.price > 0 ? 100 : 0, // dummy ticket count
    };
    updateAndStore([...userEvents, newEvent]);
  };

  return (
    <UserEventsContext.Provider value={{ userEvents, addUserEvent }}>
      {children}
    </UserEventsContext.Provider>
  );
};

export const useUserEvents = () => {
  const context = useContext(UserEventsContext);
  if (context === undefined) {
    throw new Error('useUserEvents must be used within a UserEventsProvider');
  }
  return context;
};
