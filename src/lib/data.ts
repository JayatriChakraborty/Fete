
import { Music, Trophy, Palette, Utensils, MapPin, CalendarDays, Home, PlusCircle, LucideIcon } from 'lucide-react';

export type Event = {
  id: number;
  title: string;
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
};

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'International Band Music Concert',
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
  },
  {
    id: 2,
    title: 'Art Exhibition "Modern Times"',
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
  },
  {
    id: 3,
    title: 'Food Festival "Taste of the World"',
    date: '28 Dec, 2024',
    time: '12:00 PM - 10:00 PM',
    location: 'Central Park, New York',
    imageUrl: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=2070&auto=format&fit=crop',
    organizer: {
      name: 'Gourmet Gatherings',
      avatarUrl: 'https://i.pravatar.cc/150?u=gourmet'
    },
    description: 'Embark on a culinary journey around the world! Our food festival brings the best international cuisines to one place. Sample delicious dishes, watch live cooking demonstrations, and enjoy a vibrant atmosphere with friends and family.',
    price: 120,
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
];

export type NavItem = {
  name: string;
  icon: LucideIcon;
  href: string;
};

export const navItems: NavItem[] = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Explore', icon: CalendarDays, href: '/explore' },
  { name: 'Add', icon: PlusCircle, href: '/add' },
];

