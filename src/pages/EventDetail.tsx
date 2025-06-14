
import { useParams, useNavigate } from 'react-router-dom';
import { upcomingEvents, moreEvents } from '@/lib/data';
import { ArrowLeft, Share2, Calendar, MapPin, Bookmark, Check, X } from 'lucide-react';
import { toast } from "sonner";
import { useSavedEvents } from '@/contexts/SavedEventsContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useRSVP } from '@/contexts/RSVPContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserEvents } from '@/contexts/UserEventsContext';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleSaveEvent, isEventSaved } = useSavedEvents();
  const { setRsvpStatus, getEventRsvpStatus } = useRSVP();
  const { userEvents } = useUserEvents();
  const [isRsvpDialogOpen, setIsRsvpDialogOpen] = useState(false);

  const allEvents = [...upcomingEvents, ...moreEvents, ...userEvents];
  const event = allEvents.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="flex items-center justify-center h-full text-white p-6 text-center">
        Event not found. Please check the URL or go back to the home page.
      </div>
    );
  }
  
  const isSaved = isEventSaved(event.id);
  const rsvpStatus = getEventRsvpStatus(event.id);

  const handleBack = () => {
    // This checks if there's a history stack to go back to.
    // If not (e.g., page was opened in a new tab), it navigates to the homepage.
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true }); // Use replace to avoid adding the detail page to history
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Event link copied to clipboard!");
  };

  const handleSave = () => {
    toggleSaveEvent(event.id);
  };

  const handleBuyTicket = () => {
    toast.info("Redirecting to ticket purchase...", {
      description: "This feature is coming soon!",
    });
  };

  const handleJoin = () => {
    toast.success("You've joined the event!");
  };

  const handleRsvpAction = (status: 'YES' | 'NO') => {
    if (event) {
      setRsvpStatus(event.id, status);
      setIsRsvpDialogOpen(false);
    }
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
          <button onClick={handleBack} aria-label="Go back" className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors">
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

      <div className="w-full max-w-sm p-6 mx-auto">
        {event.price > 0 ? (
          <Button
            onClick={handleBuyTicket}
            className="w-full h-14 bg-gradient-to-r from-brand-purple/80 to-brand-pink/80 text-white font-bold rounded-full text-lg backdrop-blur-sm border-2 border-white/10 hover:opacity-90 transition-opacity"
          >
            Buy Ticket ${event.price}
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            <Button onClick={handleJoin} size="lg" variant="ghost" className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white">Join</Button>
            {rsvpStatus && rsvpStatus !== 'PENDING' ? (
              <div className="w-full h-14 flex items-center justify-center text-lg font-bold rounded-full bg-card text-white">
                RSVP'd: <span className={`ml-2 ${rsvpStatus === 'YES' ? 'text-green-400' : 'text-red-400'}`}>{rsvpStatus}</span>
              </div>
            ) : (
              <Dialog open={isRsvpDialogOpen} onOpenChange={setIsRsvpDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full bg-gradient-to-r from-brand-purple/80 to-brand-pink/80 text-white backdrop-blur-sm border-2 border-white/10">RSVP</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px] bg-card border-slate-800 text-white p-0 rounded-2xl overflow-hidden">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <DialogHeader className="text-left space-y-2">
                      <DialogTitle className="text-2xl font-bold">RSVP to {event.title}</DialogTitle>
                      {event && 'rsvpQuestion' in event && (event as any).rsvpQuestion ? (
                        <p className="text-base text-muted-foreground pt-1">{(event as any).rsvpQuestion}</p>
                      ) : (
                        <DialogDescription className="text-base !mt-1">
                          Let us know if you are planning to attend this event.
                        </DialogDescription>
                      )}
                    </DialogHeader>
                    <DialogFooter className="pt-6 flex flex-row gap-4 sm:justify-center">
                      <Button variant="destructive" className="w-full" onClick={() => handleRsvpAction('NO')}>
                        <X className="mr-2 h-4 w-4" />
                        No, I can't make it
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700 w-full" onClick={() => handleRsvpAction('YES')}>
                        <Check className="mr-2 h-4 w-4" />
                        Yes, I'm going!
                      </Button>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}
      </div>
      
      <div className="h-40"></div>
    </div>
  );
};

export default EventDetail;
