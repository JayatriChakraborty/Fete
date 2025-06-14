
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import EventCard from '@/components/EventCard';
import LocationModal from '@/components/LocationModal';
import { myEvents, upcomingEvents, moreEvents } from '@/lib/data';

const Index = () => {
    const [location, setLocation] = useState<string | null>(null);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    useEffect(() => {
        // Use a timeout to prevent the modal from appearing instantly on hot-reload
        const timer = setTimeout(() => {
            const hasAskedForLocation = localStorage.getItem('hasAskedForLocation');
            if (!hasAskedForLocation) {
                setIsLocationModalOpen(true);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleGiveLocationAccess = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // For demonstration, we'll just set a mock location.
                // A real app would use a reverse geocoding API here.
                console.log('User position:', position.coords);
                setLocation("New York, NY");
                localStorage.setItem('hasAskedForLocation', 'true');
                setIsLocationModalOpen(false);
            },
            (error) => {
                console.error("Error getting location", error);
                localStorage.setItem('hasAskedForLocation', 'true'); // Don't ask again
                setIsLocationModalOpen(false);
            }
        );
    };

    const handleCloseModal = () => {
        localStorage.setItem('hasAskedForLocation', 'true');
        setIsLocationModalOpen(false);
    }
  
    return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500">
            <Header location={location} />
            <SearchBar />
            
            <YourEvents />
            <UpcomingEvents />
            <MoreEvents />
            
            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={handleCloseModal}
                onGiveAccess={handleGiveLocationAccess}
            />
        </div>
    );
};

const HorizontalEventList = ({ title, events }) => (
    <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
            {events.map((event) => (
                <div key={event.id} className="w-64 flex-shrink-0">
                    <EventCard event={event} />
                </div>
            ))}
             {events.length === 0 && <p className="text-muted-foreground">No events here yet.</p>}
        </div>
    </section>
);

const YourEvents = () => (
    <HorizontalEventList title="Your Events" events={myEvents} />
);

const UpcomingEvents = () => (
    <HorizontalEventList title="Upcoming Events" events={upcomingEvents} />
);

const MoreEvents = () => (
    <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">More Events</h2>
        <div className="flex flex-col gap-4">
            {moreEvents.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    </section>
);

export default Index;
