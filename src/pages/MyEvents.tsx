
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRSVP } from "@/contexts/RSVPContext";
import { useSavedEvents } from "@/contexts/SavedEventsContext";
import { upcomingEvents, myEvents, moreEvents } from "@/lib/data";
import RsvpEventCard from "@/components/RsvpEventCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SavedEventListItem from "@/components/SavedEventListItem";

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
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger 
            value="rsvp" 
            className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            RSVP
          </TabsTrigger>
          <TabsTrigger 
            value="saved" 
            className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            Saved
          </TabsTrigger>
        </TabsList>
        <TabsContent value="rsvp" className="mt-6">
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold mb-4 text-brand-purple">Pending Invitations</h2>
              {pendingEvents.length > 0 ? (
                <div className="space-y-4">
                  {pendingEvents.map(({ event, status }) => <RsvpEventCard key={event.id} event={event} status={status} />)}
                </div>
              ) : (
                <p className="text-muted-foreground">No pending invitations.</p>
              )}
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-4 text-green-400">Attending</h2>
              {attendingEvents.length > 0 ? (
                <div className="space-y-4">
                  {attendingEvents.map(({ event, status }) => <RsvpEventCard key={event.id} event={event} status={status} />)}
                </div>
              ) : (
                <p className="text-muted-foreground">You are not attending any events yet.</p>
              )}
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-4 text-red-400">Not Attending</h2>
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
              <div className="space-y-4">
                {savedEventsList.map(event => (
                  <SavedEventListItem key={event.id} event={event} />
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
