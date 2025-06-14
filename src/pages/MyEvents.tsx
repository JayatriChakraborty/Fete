
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRSVP } from "@/contexts/RSVPContext";
import { useSavedEvents } from "@/contexts/SavedEventsContext";
import { upcomingEvents, myEvents, moreEvents } from "@/lib/data";
import RsvpEventCard from "@/components/RsvpEventCard";
import EventCard from "@/components/EventCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const allEvents = [...upcomingEvents, ...myEvents, ...moreEvents];

const MyEvents = () => {
  const { rsvpEvents } = useRSVP();
  const { savedEventIds } = useSavedEvents();

  const savedEventsList = allEvents.filter(event => savedEventIds.includes(event.id));

  const pendingEvents = rsvpEvents
    .filter(e => e.status === 'PENDING')
    .map(e => ({ event: allEvents.find(event => event.id === e.eventId), status: e.status }))
    .filter((item): item is { event: NonNullable<typeof item.event>, status: typeof item.status } => item.event !== undefined);

  const attendingEvents = rsvpEvents
    .filter(e => e.status === 'YES')
    .map(e => ({ event: allEvents.find(event => event.id === e.eventId), status: e.status }))
    .filter((item): item is { event: NonNullable<typeof item.event>, status: typeof item.status } => item.event !== undefined);

  const notAttendingEvents = rsvpEvents
    .filter(e => e.status === 'NO')
    .map(e => ({ event: allEvents.find(event => event.id === e.eventId), status: e.status }))
    .filter((item): item is { event: NonNullable<typeof item.event>, status: typeof item.status } => item.event !== undefined);

  return (
    <div className="p-4 sm:p-6 animate-in fade-in duration-500 text-white">
      <div className="flex items-center mb-6 relative">
        <Link to="/" className="absolute left-0">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-center flex-grow">My Events</h1>
      </div>

      <Tabs defaultValue="rsvp" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-card">
          <TabsTrigger value="rsvp">RSVP</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="rsvp" className="mt-6">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-brand-purple">Pending Invitations</h2>
              {pendingEvents.length > 0 ? (
                <div className="space-y-4">
                  {pendingEvents.map(({ event, status }) => <RsvpEventCard key={event.id} event={event} status={status} />)}
                </div>
              ) : (
                <p className="text-muted-foreground">No pending invitations.</p>
              )}
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4 text-green-400">Attending</h2>
              {attendingEvents.length > 0 ? (
                <div className="space-y-4">
                  {attendingEvents.map(({ event, status }) => <RsvpEventCard key={event.id} event={event} status={status} />)}
                </div>
              ) : (
                <p className="text-muted-foreground">You are not attending any events yet.</p>
              )}
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4 text-red-400">Not Attending</h2>
              {notAttendingEvents.length > 0 ? (
                <div className="space-y-4">
                  {notAttendingEvents.map(({ event, status }) => <RsvpEventCard key={event.id} event={event} status={status} />)}
                </div>
              ) : (
                <p className="text-muted-foreground">No events marked as not attending.</p>
              )}
            </section>
          </div>
        </TabsContent>
        <TabsContent value="saved" className="mt-6">
            {savedEventsList.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {savedEventsList.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center mt-10">You have no saved events.</p>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyEvents;
