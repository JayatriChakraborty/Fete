
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from "sonner";

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

// Dummy data for demonstration since I can't add events from other pages.
const initialRsvpEvents: RsvpEvent[] = [
  { eventId: 1, status: 'PENDING' },
  { eventId: 3, status: 'PENDING' },
  { eventId: 2, status: 'YES' },
  { eventId: 4, status: 'NO' },
];

export const RSVPProvider = ({ children }: { children: ReactNode }) => {
  const [rsvpEvents, setRsvpEvents] = useState<RsvpEvent[]>([]);

  useEffect(() => {
    try {
      const storedRsvpEvents = localStorage.getItem('rsvpEvents');
      setRsvpEvents(storedRsvpEvents ? JSON.parse(storedRsvpEvents) : initialRsvpEvents);
    } catch (error) {
      console.error("Error reading rsvp events from localStorage", error);
      setRsvpEvents(initialRsvpEvents);
    }
  }, []);

  const updateAndStore = (newRsvpEvents: RsvpEvent[]) => {
    setRsvpEvents(newRsvpEvents);
    localStorage.setItem('rsvpEvents', JSON.stringify(newRsvpEvents));
  };

  const setRsvpStatus = (eventId: number, status: RsvpStatus) => {
    const newRsvpEvents = rsvpEvents.map(e => 
      e.eventId === eventId ? { ...e, status } : e
    );
    updateAndStore(newRsvpEvents);
    toast.success(`RSVP status updated to ${status}`);
  };

  const removeRsvp = (eventId: number) => {
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
