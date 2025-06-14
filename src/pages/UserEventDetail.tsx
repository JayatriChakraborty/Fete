
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUserEvents } from '@/contexts/UserEventsContext';
import { ArrowLeft, MapPin, Clock, Users, Tag, Calendar, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotFound from './NotFound';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const UserEventDetail = () => {
    const { id } = useParams();
    const { userEvents } = useUserEvents();
    const navigate = useNavigate();
    
    const event = userEvents.find((e) => e.id.toString() === id);

    if (!event) {
        return <NotFound />;
    }
    
    return (
        <div className="text-white animate-in fade-in duration-500">
            <div className="relative h-60">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                <Button variant="ghost" size="icon" className="absolute top-4 left-4 bg-background/50 backdrop-blur-sm" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
            </div>
            <div className="p-6 -mt-10">
                <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                    <Avatar>
                        <AvatarImage src={event.organizer.avatarUrl} />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{event.organizer.name}</p>
                        <p className="text-sm text-muted-foreground">Organizer</p>
                    </div>
                </div>

                <div className="space-y-4 text-muted-foreground">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-brand-purple" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-brand-purple" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-brand-purple" />
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-brand-purple" />
                        <span>{event.category}</span>
                    </div>
                    {event.price > 0 && (
                        <div className="flex items-center gap-3">
                            <Ticket className="w-5 h-5 text-brand-purple" />
                            <span>${event.price}</span>
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-3">About Event</h2>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
            </div>
        </div>
    );
}

export default UserEventDetail;
