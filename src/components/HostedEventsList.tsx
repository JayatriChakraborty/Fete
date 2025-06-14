
import { useUserEvents } from "@/contexts/UserEventsContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

const HostedEventsList = () => {
    const { userEvents } = useUserEvents();

    if (userEvents.length === 0) {
        return <p className="text-muted-foreground text-center mt-10">You have not created any events yet.</p>
    }

    return (
        <div className="space-y-4">
            {userEvents.map(event => (
                <Card key={event.id} className="bg-card">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                        <Link to={`/user-event/${event.id}`}>
                            <Button variant="link" className="p-0 h-auto mt-2 text-brand-purple">View Event</Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default HostedEventsList;
