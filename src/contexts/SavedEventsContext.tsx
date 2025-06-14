
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

type SavedEventsContextType = {
  savedEventIds: number[];
  toggleSaveEvent: (eventId: number) => void;
  isEventSaved: (eventId: number) => boolean;
};

const SavedEventsContext = createContext<SavedEventsContextType | undefined>(undefined);

export const SavedEventsProvider = ({ children }: { children: ReactNode }) => {
  const [savedEventIds, setSavedEventIds] = useState<number[]>(() => {
    try {
      const storedSavedEvents = localStorage.getItem('savedEvents');
      return storedSavedEvents ? JSON.parse(storedSavedEvents) : [];
    } catch (error) {
      console.error("Error reading saved events from localStorage", error);
      return [];
    }
  });

  const toggleSaveEvent = (eventId: number) => {
    const isCurrentlySaved = savedEventIds.includes(eventId);
    const newIds = isCurrentlySaved
      ? savedEventIds.filter(id => id !== eventId)
      : [...savedEventIds, eventId];
      
    setSavedEventIds(newIds);
    localStorage.setItem('savedEvents', JSON.stringify(newIds));
    toast.success(isCurrentlySaved ? "Event removed from saved" : "Event saved!");
  };
  
  const isEventSaved = (eventId: number) => {
    return savedEventIds.includes(eventId);
  };

  return (
    <SavedEventsContext.Provider value={{ savedEventIds, toggleSaveEvent, isEventSaved }}>
      {children}
    </SavedEventsContext.Provider>
  );
};

export const useSavedEvents = () => {
  const context = useContext(SavedEventsContext);
  if (context === undefined) {
    throw new Error('useSavedEvents must be used within a SavedEventsProvider');
  }
  return context;
};
