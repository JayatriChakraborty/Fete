
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from "sonner";
import { useAuth } from './AuthContext';

export type RsvpStatus = 'PENDING' | 'YES' | 'NO';

type RsvpEvent = {
  eventId: number;
  status: RsvpStatus;
};

type RSVPContextType = {
  rsvpEvents: RsvpEvent[];
  setRsvpStatus: (eventId: number, status: RsvpStatus) => void;
  removeRsvp: (eventId: number) => void;
  getEventRsvpStatus: (eventId: number) => RsvpStatus | undefined;
};

const RSVPContext = createContext<RSVPContextType | undefined>(undefined);

const initialRsvpEvents: RsvpEvent[] = [
  { eventId: 1, status: 'PENDING' },
  { eventId: 3, status: 'PENDING' },
  { eventId: 2, status: 'YES' },
  { eventId: 4, status: 'NO' },
];

export const RSVPProvider = ({ children }: { children: ReactNode }) => {
  const [rsvpEvents, setRsvpEvents] = useState<RsvpEvent[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      try {
        const key = `rsvpEvents_${currentUser.uid}`;
        const storedRsvpEvents = localStorage.getItem(key);
        if (storedRsvpEvents) {
          setRsvpEvents(JSON.parse(storedRsvpEvents));
        } else {
          setRsvpEvents(initialRsvpEvents);
          localStorage.setItem(key, JSON.stringify(initialRsvpEvents));
        }
      } catch (error) {
        console.error("Error handling rsvp events from localStorage", error);
        setRsvpEvents([]);
      }
    } else {
      setRsvpEvents([]);
    }
  }, [currentUser]);

  const updateAndStore = (newRsvpEvents: RsvpEvent[]) => {
    if (currentUser) {
      setRsvpEvents(newRsvpEvents);
      localStorage.setItem(`rsvpEvents_${currentUser.uid}`, JSON.stringify(newRsvpEvents));
    }
  };

  const setRsvpStatus = (eventId: number, status: RsvpStatus) => {
    if (!currentUser) return;
    const eventIndex = rsvpEvents.findIndex(e => e.eventId === eventId);
    let newRsvpEvents;

    if (eventIndex > -1) {
      // Event exists, update its status
      newRsvpEvents = rsvpEvents.map(e => 
        e.eventId === eventId ? { ...e, status } : e
      );
    } else {
      // Event doesn't exist, add it to the list
      newRsvpEvents = [...rsvpEvents, { eventId, status }];
    }
    
    updateAndStore(newRsvpEvents);
    toast.success(`Your RSVP is set to ${status}!`);
  };

  const removeRsvp = (eventId: number) => {
    if (!currentUser) return;
    const newRsvpEvents = rsvpEvents.filter(e => e.eventId !== eventId);
    updateAndStore(newRsvpEvents);
    toast.success("RSVP removed.");
  };

  const getEventRsvpStatus = (eventId: number) => {
    return rsvpEvents.find(e => e.eventId === eventId)?.status;
  };

  return (
    <RSVPContext.Provider value={{ rsvpEvents, setRsvpStatus, removeRsvp, getEventRsvpStatus }}>
      {children}
    </RSVPContext.Provider>
  );
};

export const useRSVP = () => {
  const context = useContext(RSVPContext);
  if (context === undefined) {
    throw new Error('useRSVP must be used within a RSVPProvider');
  }
  return context;
};
