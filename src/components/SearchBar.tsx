
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import SearchCommand from "./SearchCommand";

const SearchBar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-muted-foreground h-12 px-4 rounded-full bg-card border-none hover:bg-card/90 text-sm font-normal"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-3 h-5 w-5" />
        <span className="flex-grow text-left truncate">Search for events, organizations, hosts...</span>
        <kbd className="pointer-events-none ml-auto hidden h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium sm:flex">
          <span className="text-base">⌘</span>K
        </kbd>
      </Button>
      <SearchCommand open={open} setOpen={setOpen} />
    </>
  );
};

export default SearchBar;
