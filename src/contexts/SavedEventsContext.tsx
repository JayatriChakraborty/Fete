
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { useAuth } from './AuthContext';

type SavedEventsContextType = {
  savedEventIds: number[];
  toggleSaveEvent: (eventId: number) => void;
  isEventSaved: (eventId: number) => boolean;
};

const SavedEventsContext = createContext<SavedEventsContextType | undefined>(undefined);

export const SavedEventsProvider = ({ children }: { children: ReactNode }) => {
  const [savedEventIds, setSavedEventIds] = useState<number[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      try {
        const storedSavedEvents = localStorage.getItem(`savedEvents_${currentUser.uid}`);
        setSavedEventIds(storedSavedEvents ? JSON.parse(storedSavedEvents) : []);
      } catch (error) {
        console.error("Error reading saved events from localStorage", error);
        setSavedEventIds([]);
      }
    } else {
      setSavedEventIds([]);
    }
  }, [currentUser]);

  const toggleSaveEvent = (eventId: number) => {
    if (!currentUser) return;

    const isCurrentlySaved = savedEventIds.includes(eventId);
    const newIds = isCurrentlySaved
      ? savedEventIds.filter(id => id !== eventId)
      : [...savedEventIds, eventId];
      
    setSavedEventIds(newIds);
    localStorage.setItem(`savedEvents_${currentUser.uid}`, JSON.stringify(newIds));
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
