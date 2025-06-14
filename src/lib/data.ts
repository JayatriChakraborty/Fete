export type Event = {
    id: number;
    title: string;
    date: string;
    location: string;
    imageUrl: string;
    organizer: string;
    price: number | 'Free';
    category: string;
    description: string;
    attendees: number;
    capacity: number;
    isSaved?: boolean;
    rsvped?: boolean;
    userEvent?: boolean;
};

export const myEvents: Event[] = [
  { id: 1, title: 'Design System Meetup', date: 'June 20, 2025', location: 'San Francisco, CA', imageUrl: '/placeholder.svg', organizer: 'Figma', price: 'Free', category: 'Design', description: '', attendees: 120, capacity: 200, isSaved: true, rsvped: true },
  { id: 2, title: 'React Conf 2025', date: 'July 15, 2025', location: 'Online', imageUrl: '/placeholder.svg', organizer: 'React Team', price: 50, category: 'Development', description: '', attendees: 1500, capacity: 2000, rsvped: true },
];

export const upcomingEvents: Event[] = [
  { id: 3, title: 'Vue.js Nation', date: 'August 5, 2025', location: 'New York, NY', imageUrl: '/placeholder.svg', organizer: 'Vue.js Team', price: 100, category: 'Development', description: '', attendees: 800, capacity: 1000 },
  { id: 4, title: 'AI in Product Design', date: 'September 10, 2025', location: 'London, UK', imageUrl: '/placeholder.svg', organizer: 'Product Hunt', price: 'Free', category: 'Design', description: '', attendees: 300, capacity: 500 },
];

export const moreEvents: Event[] = [
    { id: 5, title: 'Web3 Summit', date: 'October 1, 2025', location: 'Lisbon, Portugal', imageUrl: '/placeholder.svg', organizer: 'Web3 Foundation', price: 250, category: 'Web3', description: '', attendees: 2500, capacity: 3000 },
    { id: 6, title: 'Indie Hackers Meetup', date: 'October 15, 2025', location: 'New York, NY', imageUrl: '/placeholder.svg', organizer: 'Indie Hackers', price: 'Free', category: 'Community', description: '', attendees: 100, capacity: 150 },
    { id: 7, title: 'SaaS Growth Conference', date: 'November 2, 2025', location: 'Austin, TX', imageUrl: '/placeholder.svg', organizer: 'SaaStr', price: 500, category: 'Business', description: '', attendees: 1000, capacity: 1200 },
    { id: 8, title: 'Cybersecurity Forum', date: 'November 20, 2025', location: 'Washington D.C.', imageUrl: '/placeholder.svg', organizer: 'CyberSecOrg', price: 150, category: 'Security', description: '', attendees: 400, capacity: 500 },
];

export type Organization = {
  id: number;
  name: string;
};

export const organizations: Organization[] = [
  { id: 1, name: 'Tech Events Inc.' },
  { id: 2, name: 'Design Conf Co.' },
];

export type User = {
  id: number;
  name: string;
  avatarUrl: string;
};

export const users: User[] = [
  { id: 1, name: 'James', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: 2, name: 'Sarah', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
  { id: 3, name: 'Michael', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
];
