
import { useParams, useNavigate } from 'react-router-dom';
import { upcomingEvents, moreEvents } from '@/lib/data';
import { ArrowLeft, Share2, Calendar, MapPin, Bookmark } from 'lucide-react';
import { toast } from "sonner";
import { useSavedEvents } from '@/contexts/SavedEventsContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleSaveEvent, isEventSaved } = useSavedEvents();

  const allEvents = [...upcomingEvents, ...moreEvents];
  const event = allEvents.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="flex items-center justify-center h-full text-white p-6 text-center">
        Event not found. Please check the URL or go back to the home page.
      </div>
    );
  }
  
  const isSaved = isEventSaved(event.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Event link copied to clipboard!");
  };

  const handleSave = () => {
    toggleSaveEvent(event.id);
  };

  const locationParts = event.location.split(',');
  const venue = locationParts[0];
  const address = locationParts.slice(1).join(',').trim();

  const ticketsLeftPercentage = event.totalTickets > 0 ? ((event.totalTickets - event.ticketsSold) / event.totalTickets) * 100 : 0;

  return (
    <div className="bg-background text-white">
      <div className="relative">
        <img src={event.imageUrl} alt={event.title} className="w-full h-80 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>

        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
          <button onClick={() => navigate(-1)} className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <button onClick={handleSave} className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors">
              <Bookmark className={cn("w-6 h-6", isSaved && "fill-white")} />
            </button>
            <button onClick={handleShare} className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </header>
      </div>

      <div className="p-6 space-y-6 -mt-16 relative z-10">
        <h1 className="text-3xl font-bold">{event.title}</h1>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-card p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-brand-purple" />
            </div>
            <div>
              <p className="font-semibold">{event.date}</p>
              <p className="text-sm text-muted-foreground">{event.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-card p-3 rounded-xl">
              <MapPin className="w-6 h-6 text-brand-purple" />
            </div>
            <div>
              <p className="font-semibold">{venue}</p>
              <p className="text-sm text-muted-foreground">{address}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <img src={event.organizer.avatarUrl} alt={event.organizer.name} className="w-14 h-14 rounded-full object-cover" />
          <div>
            <p className="font-semibold">{event.organizer.name}</p>
            <p className="text-sm text-muted-foreground">Organizer</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">About Event</h2>
          <p className="text-muted-foreground leading-relaxed">{event.description}</p>
        </div>

        {event.price > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Tickets</h2>
            <div className="bg-card p-4 rounded-xl">
              <div className="flex justify-between items-center text-muted-foreground mb-2">
                <span>Available</span>
                <span>{event.totalTickets - event.ticketsSold} / {event.totalTickets}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-brand-purple h-2.5 rounded-full" style={{ width: `${ticketsLeftPercentage}%` }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm p-6 bg-background/80 backdrop-blur-lg">
        {event.price > 0 ? (
          <button className="w-full h-14 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold rounded-full flex items-center justify-center text-lg hover:opacity-90 transition-opacity">
            Buy Ticket ${event.price}
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <Button size="lg" variant="outline" className="w-full">Join</Button>
            <Button size="lg" className="w-full bg-gradient-to-r from-brand-purple to-brand-pink">RSVP</Button>
          </div>
        )}
      </div>
      
      <div className="h-40"></div>
    </div>
  );
};

export default EventDetail;
