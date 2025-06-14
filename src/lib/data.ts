
import { Music, Trophy, Palette, Utensils, MapPin, CalendarDays, Home, PlusCircle, LucideIcon } from 'lucide-react';

export type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
};

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'International Band Music Concert',
    date: '14 Dec, 2024',
    location: 'Grand Park, New York',
    imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Art Exhibition "Modern Times"',
    date: '20 Dec, 2024',
    location: 'Metropolitan Museum',
    imageUrl: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=1935&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Food Festival "Taste of the World"',
    date: '28 Dec, 2024',
    location: 'Central Park, New York',
    imageUrl: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=2070&auto=format&fit=crop',
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

