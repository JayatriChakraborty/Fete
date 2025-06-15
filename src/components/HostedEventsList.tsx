
import { useUserEvents } from "@/contexts/UserEventsContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

const HostedEventsList = () => {
    const { userEvents, deleteUserEvent } = useUserEvents();

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
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <Link to={`/user-event/${event.id}`}>
                            <Button variant="link" className="p-0 h-auto text-brand-purple">View Event</Button>
                        </Link>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteUserEvent(event.id)}
                            className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default HostedEventsList;
