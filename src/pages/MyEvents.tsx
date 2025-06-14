
import { useState } from 'react';
import { useRSVP, RsvpStatus } from '@/contexts/RSVPContext';
import { upcomingEvents, moreEvents, Event } from '@/lib/data';
import RsvpEventCard from '@/components/RsvpEventCard';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useUserEvents } from '@/contexts/UserEventsContext';
import { useSavedEvents } from '@/contexts/SavedEventsContext';
import EventCard from '@/components/EventCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterStatus = 'ALL' | 'YES' | 'NO';

const MyEvents = () => {
  const { userEvents } = useUserEvents();
  const allEvents = [...upcomingEvents, ...moreEvents, ...userEvents];

  // Saved Events Logic
  const { savedEventIds } = useSavedEvents();
  const savedEvents = allEvents.filter(event => savedEventIds.includes(event.id));

  // RSVP Logic
  const { rsvpEvents } = useRSVP();
  const [respondedFilter, setRespondedFilter] = useState<FilterStatus>('ALL');

  const getEventDetails = (eventId: number): Event | undefined => {
    return allEvents.find(event => event.id === eventId);
  }

  const pendingRsvps = rsvpEvents.filter(rsvp => rsvp.status === 'PENDING');
  
  const respondedRsvpsRaw = rsvpEvents.filter(rsvp => rsvp.status === 'YES' || rsvp.status === 'NO');
  const filteredRespondedRsvps = respondedFilter === 'ALL'
    ? respondedRsvpsRaw
    : respondedRsvpsRaw.filter(rsvp => rsvp.status === respondedFilter);

  return (
    <div className="p-6 animate-in fade-in duration-500 text-white">
      <h1 className="text-3xl font-bold">My Events</h1>
      <p className="text-muted-foreground mt-2">View your saved events and RSVPs.</p>

      <Tabs defaultValue="rsvp" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rsvp">RSVP'd</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="rsvp" className="mt-4">
          {rsvpEvents.length === 0 ? (
            <p className="text-muted-foreground mt-6 text-center">You haven't RSVP'd to any events yet.</p>
          ) : (
            <div className="mt-4">
                <Accordion type="multiple" defaultValue={['pending-rsvps', 'responded-rsvps']} className="w-full space-y-4">
                  <AccordionItem value="pending-rsvps" className="border-b-0">
                    <AccordionTrigger className="bg-card rounded-t-lg px-4 py-2 hover:no-underline">
                      <h2 className="text-xl font-bold text-white">Pending RSVPs ({pendingRsvps.length})</h2>
                    </AccordionTrigger>
                    <AccordionContent className="bg-card rounded-b-lg px-4">
                      {pendingRsvps.length > 0 ? (
                        <div className="flex flex-col gap-4 pt-4">
                          {pendingRsvps.map(({ eventId, status }) => {
                            const event = getEventDetails(eventId);
                            if (!event) return null;
                            return <RsvpEventCard key={eventId} event={event} status={status} />;
                          })}
                        </div>
                      ) : (
                        <p className="text-muted-foreground py-4">No pending RSVPs.</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="responded-rsvps" className="border-b-0">
                     <AccordionTrigger className="bg-card rounded-t-lg px-4 py-2 hover:no-underline">
                      <h2 className="text-xl font-bold text-white">Responded Events ({respondedRsvpsRaw.length})</h2>
                    </AccordionTrigger>
                    <AccordionContent className="bg-card rounded-b-lg px-4">
                      <div className="pt-4">
                        <div className="flex gap-2 mb-4 border-b border-border pb-4">
                          <Button size="sm" variant={respondedFilter === 'ALL' ? 'default' : 'secondary'} onClick={() => setRespondedFilter('ALL')}>All</Button>
                          <Button size="sm" variant={respondedFilter === 'YES' ? 'default' : 'secondary'} onClick={() => setRespondedFilter('YES')}>Yes</Button>
                          <Button size="sm" variant={respondedFilter === 'NO' ? 'default' : 'secondary'} onClick={() => setRespondedFilter('NO')}>No</Button>
                        </div>
                        {filteredRespondedRsvps.length > 0 ? (
                          <div className="flex flex-col gap-4">
                            {filteredRespondedRsvps.map(({ eventId, status }) => {
                              const event = getEventDetails(eventId);
                              if (!event) return null;
                              return <RsvpEventCard key={eventId} event={event} status={status} />;
                            })}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No events match the current filter.</p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="mt-4">
          {savedEvents.length > 0 ? (
            <div className="flex flex-col gap-4">
              {savedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground mt-2 text-center">Your bookmarked events will be listed here.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyEvents;
