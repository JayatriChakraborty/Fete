
import { Search } from "lucide-react";

const SearchBar = () => (
  <div className="relative">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
    <input
      type="text"
      placeholder="Search events..."
      className="w-full bg-card border-none rounded-full py-3 pl-12 pr-4 h-12 focus:ring-2 focus:ring-brand-purple transition-shadow"
    />
  </div>
);

export default SearchBar;
