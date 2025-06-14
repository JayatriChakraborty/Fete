
import { useSavedEvents } from '@/contexts/SavedEventsContext';
import { upcomingEvents, moreEvents } from '@/lib/data';
import EventCard from '@/components/EventCard';

const SavedEvents = () => {
  const { savedEventIds } = useSavedEvents();
  const allEvents = [...upcomingEvents, ...moreEvents];
  const savedEvents = allEvents.filter(event => savedEventIds.includes(event.id));

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-white">Saved Events</h1>
      
      {savedEvents.length > 0 ? (
        <div className="mt-6 flex flex-col gap-4">
          {savedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-2">Your bookmarked events will be listed here.</p>
      )}
    </div>
  );
};

export default SavedEvents;
