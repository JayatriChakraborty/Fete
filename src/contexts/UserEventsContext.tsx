import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Event } from '@/lib/data';
import { useAuth } from './AuthContext';

// Extend Event type to include custom RSVP question
export type UserEvent = Event & {
  rsvpQuestion?: string;
  collaborators?: { name: string; avatarUrl: string }[];
};

// Redefining to match the form data from CreateEvent page to fix build error.
// Most fields are optional from the form.
type AddUserEventParams = {
  date: string;
  title?: string;
  time?: string;
  location?: string;
  imageUrl?: string;
  description?: string;
  price?: number;
  rsvpQuestion?: string;
  isPrivate?: boolean;
  collaborators?: string;
}

type UserEventsContextType = {
  userEvents: UserEvent[];
  addUserEvent: (event: AddUserEventParams) => void;
  deleteUserEvent: (eventId: number) => void;
};

const UserEventsContext = createContext<UserEventsContextType | undefined>(undefined);

export const UserEventsProvider = ({ children }: { children: ReactNode }) => {
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      try {
        const storedUserEvents = localStorage.getItem(`userEvents_${currentUser.uid}`);
        if (storedUserEvents) {
          setUserEvents(JSON.parse(storedUserEvents));
        } else {
          setUserEvents([]);
        }
      } catch (error) {
        console.error("Error reading user events from localStorage", error);
        setUserEvents([]);
      }
    } else {
      setUserEvents([]);
    }
  }, [currentUser]);

  const updateAndStore = (newUserEvents: UserEvent[]) => {
    if (currentUser) {
      setUserEvents(newUserEvents);
      localStorage.setItem(`userEvents_${currentUser.uid}`, JSON.stringify(newUserEvents));
    }
  };

  const addUserEvent = (eventData: AddUserEventParams) => {
    const collaborators = eventData.collaborators
      ?.split(',')
      .map(name => name.trim())
      .filter(name => name)
      .map(name => ({ name, avatarUrl: 'https://github.com/shadcn.png' }));
      
    // We construct a full UserEvent here, providing defaults for optional fields.
    const newEvent: UserEvent = {
      id: Date.now(),
      category: 'User Created',
      organizer: {
        name: currentUser?.displayName || 'You',
        avatarUrl: currentUser?.photoURL || 'https://github.com/shadcn.png'
      },
      ticketsSold: 0,
      // User-provided data with defaults
      title: eventData.title || 'Untitled Event',
      date: eventData.date,
      time: eventData.time || 'Time not set',
      location: eventData.location || 'Location not set',
      imageUrl: eventData.imageUrl || '/placeholder.svg',
      description: eventData.description || 'No description provided.',
      price: eventData.price || 0,
      totalTickets: (eventData.price || 0) > 0 ? 100 : 0, // dummy ticket count
      isPrivate: eventData.isPrivate ?? false,
      rsvpQuestion: eventData.rsvpQuestion,
      collaborators,
    };
    updateAndStore([...userEvents, newEvent]);
  };

  const deleteUserEvent = (eventId: number) => {
    const updatedEvents = userEvents.filter(event => event.id !== eventId);
    updateAndStore(updatedEvents);
  };

  return (
    <UserEventsContext.Provider value={{ userEvents, addUserEvent, deleteUserEvent }}>
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
