
import CategoryIcon from "@/components/CategoryIcon";
import EventCard from "@/components/EventCard";
import { categories, upcomingEvents } from "@/lib/data";
import { Search, SlidersHorizontal } from "lucide-react";

const Index = () => {
  return (
    <div className="p-6 space-y-8">
      <Header />
      <SearchBar />
      <Categories />
      <UpcomingEvents />
    </div>
  );
};

const Header = () => (
  <header className="flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-bold text-white">Hello, James!</h1>
      <p className="text-sm text-muted-foreground">Let's find your next event.</p>
    </div>
    <div className="w-12 h-12 rounded-full bg-card overflow-hidden">
      <img src="https://i.pravatar.cc/150?u=james" alt="User avatar" className="w-full h-full object-cover" />
    </div>
  </header>
);

const SearchBar = () => (
  <div className="flex items-center gap-4">
    <div className="relative flex-grow">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search events..."
        className="w-full bg-card border-none rounded-full py-3 pl-12 pr-4 h-12 focus:ring-2 focus:ring-brand-purple transition-shadow"
      />
    </div>
    <button className="w-12 h-12 flex-shrink-0 bg-card rounded-full flex items-center justify-center">
      <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
    </button>
  </div>
);

const UpcomingEvents = () => (
  <section className="space-y-4">
    <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
      {upcomingEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  </section>
);

const Categories = () => (
  <section className="space-y-4">
    <h2 className="text-xl font-bold text-white">Categories</h2>
    <div className="flex justify-around items-center">
      {categories.map((category) => (
        <CategoryIcon key={category.name} category={category} />
      ))}
    </div>
  </section>
);

export default Index;

