
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { upcomingEvents, myEvents, moreEvents } from "@/lib/data";
import { useRSVP } from "@/contexts/RSVPContext";

const allEvents = [...upcomingEvents, ...myEvents, ...moreEvents];

const MyTicketsList = () => {
    const { toast } = useToast();
    const { rsvpEvents } = useRSVP();

    const attendingEventIds = rsvpEvents
        .filter(rsvp => rsvp.status === 'YES')
        .map(rsvp => rsvp.eventId);

    const myTickets = allEvents.filter(event => 
        attendingEventIds.includes(event.id) && event.price > 0
    );

    const handleDownload = (eventName: string) => {
        toast({
            title: "Download Started",
            description: `Your ticket for "${eventName}" is downloading.`,
        });
        // In a real app, this would trigger a file download.
    };
    
    if (myTickets.length === 0) {
        return <p className="text-muted-foreground text-center mt-10">You have no tickets for paid events.</p>
    }

    return (
        <div className="space-y-4">
            {myTickets.map(event => (
                <Card key={event.id} className="bg-card">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-brand-purple hover:bg-brand-purple/90" onClick={() => handleDownload(event.title)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Ticket
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default MyTicketsList;
