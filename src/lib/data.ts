
import { Music, Trophy, Palette, Utensils, Home, PlusCircle, LucideIcon, Compass, Ticket, Bookmark, Mic, Clapperboard, Briefcase, Laptop, HeartPulse, PenSquare, HeartHandshake, PartyPopper } from 'lucide-react';

export type Event = {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  organizer: {
    name: string;
    avatarUrl: string;
  };
  description: string;
  price: number;
  isPrivate: boolean;
  totalTickets: number;
  ticketsSold: number;
};

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'International Band Music Concert',
    category: 'Music',
    date: '14 Dec, 2024',
    time: '8:00 PM - 12:00 PM',
    location: 'Grand Park, New York',
    imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070&auto=format&fit=crop',
    organizer: {
      name: 'The Music Fest Co.',
      avatarUrl: 'https://i.pravatar.cc/150?u=musicfest'
    },
    description: 'Experience the magic of live music under the stars. The International Band Music Concert brings together talented artists from around the globe for a night of unforgettable performances. Enjoy a diverse range of genres, from classical to rock, in the beautiful setting of Grand Park.',
    price: 75,
    isPrivate: false,
    totalTickets: 500,
    ticketsSold: 350,
  },
  {
    id: 2,
    title: 'Art Exhibition "Modern Times"',
    category: 'Art',
    date: '20 Dec, 2024',
    time: '10:00 AM - 6:00 PM',
    location: 'Metropolitan Museum, Chicago',
    imageUrl: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=1935&auto=format&fit=crop',
    organizer: {
      name: 'Art Curators Inc.',
      avatarUrl: 'https://i.pravatar.cc/150?u=artcurators'
    },
    description: 'Explore the evolution of art in the modern era. This exhibition features masterpieces from renowned artists, showcasing the dynamic shifts in style and perspective that have defined the last century. A must-see for art lovers.',
    price: 50,
    isPrivate: false,
    totalTickets: 200,
    ticketsSold: 120,
  },
  {
    id: 3,
    title: 'Food Festival "Taste of the World"',
    category: 'Food',
    date: '28 Dec, 2024',
    time: '12:00 PM - 10:00 PM',
    location: 'Central Park, New York',
    imageUrl: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=2070&auto=format&fit=crop',
    organizer: {
      name: 'Gourmet Gatherings',
      avatarUrl: 'https://i.pravatar.cc/150?u=gourmet'
    },
    description: 'Embark on a culinary journey around the world! Our food festival brings the best international cuisines to one place. Sample delicious dishes, watch live cooking demonstrations, and enjoy a vibrant atmosphere with friends and family.',
    price: 0,
    isPrivate: true,
    totalTickets: 1000,
    ticketsSold: 0,
  },
];

export const myEvents: Event[] = [
  upcomingEvents[2]
];

export const moreEvents: Event[] = [
    {
    id: 4,
    title: 'Standup Comedy Night',
    category: 'Comedy',
    date: '18 Jan, 2025',
    time: '8:00 PM - 10:00 PM',
    location: 'The Comedy Cellar, New York',
    imageUrl: 'https://images.unsplash.com/photo-1598822941524-705a5b813b14?q=80&w=1974&auto=format&fit=crop',
    organizer: {
      name: 'Funny Business',
      avatarUrl: 'https://i.pravatar.cc/150?u=funny'
    },
    description: 'Get ready to laugh your socks off with the best comedians in town. A night of hilarious stand-up comedy.',
    price: 25,
    isPrivate: false,
    totalTickets: 100,
    ticketsSold: 80,
  },
  {
    id: 5,
    title: 'Indie Film Festival',
    category: 'Movies',
    date: '22-24 Jan, 2025',
    time: 'All Day',
    location: 'Indie Cinema, Los Angeles',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963e?q=80&w=2070&auto=format&fit=crop',
    organizer: {
      name: 'Film Buffs Society',
      avatarUrl: 'https://i.pravatar.cc/150?u=filmbuffs'
    },
    description: 'Discover the next generation of filmmakers. A three-day festival showcasing independent films from around the world.',
    price: 90,
    isPrivate: false,
    totalTickets: 300,
    ticketsSold: 150,
  },
];


export type Category = {
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
};

export const categories: Category[] = [
  { name: 'Music', icon: Music, color: 'text-red-500', bgColor: 'bg-red-500/10' },
  { name: 'Sports', icon: Trophy, color: 'text-green-500', bgColor: 'bg-green-500/10' },
  { name: 'Art', icon: Palette, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { name: 'Food', icon: Utensils, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
  { name: 'Comedy', icon: Mic, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  { name: 'Movies', icon: Clapperboard, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  { name: 'Business', icon: Briefcase, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
  { name: 'Tech', icon: Laptop, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
  { name: 'Health', icon: HeartPulse, color: 'text-rose-500', bgColor: 'bg-rose-500/10' },
  { name: 'Workshop', icon: PenSquare, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
  { name: 'Charity', icon: HeartHandshake, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
  { name: 'Party', icon: PartyPopper, color: 'text-fuchsia-500', bgColor: 'bg-fuchsia-500/10' },
];

export type NavItem = {
  name: string;
  icon: LucideIcon;
  href: string;
};

export const navItems: NavItem[] = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Explore', icon: Compass, href: '/explore' },
  { name: 'Create', icon: PlusCircle, href: '/create' },
  { name: 'RSVP', icon: Ticket, href: '/rsvp' },
  { name: 'Saved', icon: Bookmark, href: '/saved' },
];
