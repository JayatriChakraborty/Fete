import { Music, Trophy, Palette, Utensils, Home, PlusCircle, LucideIcon, Compass, Ticket, Bookmark, Mic, Clapperboard, Briefcase, Laptop, HeartPulse, PenSquare, HeartHandshake, PartyPopper, User as UserIcon } from 'lucide-react';

export type User = {
  id: number;
  name: string;
  avatar: string;
};

export type Organization = {
  id: number;
  name: string;
  avatar: string;
};

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
    avatar: string;
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
      avatar: 'https://i.pravatar.cc/150?u=musicfest'
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
      avatar: 'https://i.pravatar.cc/150?u=artcurators'
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
      avatar: 'https://i.pravatar.cc/150?u=gourmet'
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
      avatar: 'https://i.pravatar.cc/150?u=funny'
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
      avatar: 'https://i.pravatar.cc/150?u=filmbuffs'
    },
    description: 'Discover the next generation of filmmakers. A three-day festival showcasing independent films from around the world.',
    price: 90,
    isPrivate: false,
    totalTickets: 300,
    ticketsSold: 150,
  },
];

export const users: User[] = [
  { id: 101, name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=alice' },
  { id: 102, name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?u=bob' },
  { id: 103, name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=charlie' },
];

export const organizations: Organization[] = [
  { id: 1, name: 'The Music Fest Co.', avatar: 'https://i.pravatar.cc/150?u=musicfest' },
  { id: 2, name: 'Art Curators Inc.', avatar: 'https://i.pravatar.cc/150?u=artcurators' },
  { id: 3, name: 'Gourmet Gatherings', avatar: 'https://i.pravatar.cc/150?u=gourmet' },
  { id: 4, name: 'Funny Business', avatar: 'https://i.pravatar.cc/150?u=funny' },
  { id: 5, name: 'Film Buffs Society', avatar: 'https://i.pravatar.cc/150?u=filmbuffs' },
];


export type Category = {
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
};

export const categories: Category[] = [
  { name: 'Music', icon: Music, color: 'text-brand-pink', bgColor: 'bg-brand-pink/10' },
  { name: 'Sports', icon: Trophy, color: 'text-brand-teal', bgColor: 'bg-brand-teal/10' },
  { name: 'Art', icon: Palette, color: 'text-brand-blue', bgColor: 'bg-brand-blue/10' },
  { name: 'Food', icon: Utensils, color: 'text-brand-yellow', bgColor: 'bg-brand-yellow/10' },
  { name: 'Comedy', icon: Mic, color: 'text-brand-pink', bgColor: 'bg-brand-pink/10' },
  { name: 'Movies', icon: Clapperboard, color: 'text-brand-teal', bgColor: 'bg-brand-teal/10' },
  { name: 'Business', icon: Briefcase, color: 'text-brand-blue', bgColor: 'bg-brand-blue/10' },
  { name: 'Tech', icon: Laptop, color: 'text-brand-yellow', bgColor: 'bg-brand-yellow/10' },
  { name: 'Health', icon: HeartPulse, color: 'text-brand-pink', bgColor: 'bg-brand-pink/10' },
  { name: 'Workshop', icon: PenSquare, color: 'text-brand-teal', bgColor: 'bg-brand-teal/10' },
  { name: 'Charity', icon: HeartHandshake, color: 'text-brand-blue', bgColor: 'bg-brand-blue/10' },
  { name: 'Party', icon: PartyPopper, color: 'text-brand-yellow', bgColor: 'bg-brand-yellow/10' },
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
  { name: 'My Events', icon: Ticket, href: '/my-events' },
  { name: 'Profile', icon: UserIcon, href: '/profile' },
];
