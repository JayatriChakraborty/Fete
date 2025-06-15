
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
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

    const handleViewTicket = (eventName: string) => {
        toast({
            title: "Viewing Ticket",
            description: `Opening ticket for "${eventName}".`,
        });
        // In a real app, this would open a modal or navigate to a ticket page.
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
                    <CardFooter className="flex gap-2">
                        <Button variant="outline" className="w-full" onClick={() => handleViewTicket(event.title)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Ticket
                        </Button>
                        <Button className="w-full bg-brand-purple hover:bg-brand-purple/90" onClick={() => handleDownload(event.title)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default MyTicketsList;
