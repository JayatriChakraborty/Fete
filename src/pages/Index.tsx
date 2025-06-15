
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import EventCard from '@/components/EventCard';
import LocationModal from '@/components/LocationModal';
import { myEvents, upcomingEvents, moreEvents, Event } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
    const [location, setLocation] = useState<string | null>(() => localStorage.getItem("userLocation"));
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const { currentUser, loading } = useAuth();

    useEffect(() => {
        if (!location) {
            const timer = setTimeout(() => {
                const hasAskedForLocation = localStorage.getItem('hasAskedForLocation');
                if (!hasAskedForLocation) {
                    setIsLocationModalOpen(true);
                }
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [location]);

    const handleSetLocation = (newLocation: string) => {
        setLocation(newLocation);
        localStorage.setItem('userLocation', newLocation);
        localStorage.setItem('hasAskedForLocation', 'true');
        setIsLocationModalOpen(false);
    };

    const handleGiveLocationAccess = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // For demonstration, we'll just set a mock location.
                // A real app would use a reverse geocoding API here.
                console.log('User position:', position.coords);
                handleSetLocation("New York, NY");
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

    const myEventIds = myEvents.map(event => event.id);
    let filteredMoreEvents = moreEvents.filter(event => !myEventIds.includes(event.id));

    if (location) {
        const userCity = location.split(',')[0];
        filteredMoreEvents = filteredMoreEvents.filter(event => event.location.includes(userCity));
    }
  
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8">
            <div className="flex justify-between items-center">
                <Header location={location} onSetLocation={handleSetLocation} />
                {!currentUser && (
                    <Button asChild variant="ghost">
                        <Link to="/login">Login</Link>
                    </Button>
                )}
            </div>
            <SearchBar />
            
            <YourEvents />
            <UpcomingEvents />
            <MoreEvents events={filteredMoreEvents} />
            
            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={handleCloseModal}
                onGiveAccess={handleGiveLocationAccess}
            />
        </div>
    );
};

const HorizontalEventList = ({ title, events }: { title: string, events: Event[] }) => (
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

const MoreEvents = ({ events }: { events: Event[] }) => (
    <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">More Events</h2>
        <div className="flex flex-col gap-4">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
            {events.length === 0 && <p className="text-muted-foreground">No more events to show.</p>}
        </div>
    </section>
);

export default Index;
