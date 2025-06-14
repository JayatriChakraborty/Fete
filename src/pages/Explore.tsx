
import { useState } from "react";
import Categories from "@/components/Categories";
import EventSection from "@/components/EventSection";
import { upcomingEvents, moreEvents } from "@/lib/data";

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  // For demonstration, we'll hardcode the user's location.
  // In a real app, this would come from geolocation API or user settings.
  const userLocation = "New York";
  const allEvents = [...upcomingEvents, ...moreEvents];

  const filteredEvents =
    selectedCategory === "All"
      ? allEvents
      : allEvents.filter((event) => event.category === selectedCategory);

  const eventsNearYou = filteredEvents.filter(event => event.location.includes(userLocation));
  const otherEvents = filteredEvents.filter(event => !event.location.includes(userLocation));

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-white">Explore</h1>
      <Categories 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {filteredEvents.length > 0 ? (
        <>
          <EventSection title="Events Near You" events={eventsNearYou} />
          <EventSection title="More Events" events={otherEvents} />
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-white text-lg">No events found for this category.</p>
          <p className="text-muted-foreground">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
