
import Categories from "@/components/Categories";
import EventSection from "@/components/EventSection";
import { upcomingEvents, moreEvents } from "@/lib/data";

const Explore = () => {
  // For demonstration, we'll hardcode the user's location.
  // In a real app, this would come from geolocation API or user settings.
  const userLocation = "New York";
  const allEvents = [...upcomingEvents, ...moreEvents];

  const eventsNearYou = allEvents.filter(event => event.location.includes(userLocation));
  const otherEvents = allEvents.filter(event => !event.location.includes(userLocation));

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-white">Explore</h1>
      <Categories />
      <EventSection title="Events Near You" events={eventsNearYou} />
      <EventSection title="More Events" events={otherEvents} />
    </div>
  );
};

export default Explore;
