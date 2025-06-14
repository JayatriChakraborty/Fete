
import { useState } from "react";
import Categories from "@/components/Categories";
import EventSection from "@/components/EventSection";
import { upcomingEvents, moreEvents } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="px-6 pt-6 space-y-8">
        <Categories 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      
      <ScrollArea className="flex-1 mt-8">
        <div className="px-6 pb-6">
          {filteredEvents.length > 0 ? (
            <div className="space-y-8">
              <EventSection title="Events Near You" events={eventsNearYou} />
              <EventSection title="More Events" events={otherEvents} />
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-white text-lg">No events found for this category.</p>
              <p className="text-muted-foreground">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Explore;
