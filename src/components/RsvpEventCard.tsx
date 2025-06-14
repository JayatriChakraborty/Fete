
import { Event } from '@/lib/data';
import { RsvpStatus, useRSVP } from '@/contexts/RSVPContext';
import { Button } from '@/components/ui/button';
import { Trash2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

type RsvpEventCardProps = {
  event: Event;
  status: RsvpStatus;
};

const RsvpEventCard = ({ event, status }: RsvpEventCardProps) => {
  const { setRsvpStatus, removeRsvp } = useRSVP();

  return (
    <div className="bg-card p-4 rounded-2xl flex flex-col sm:flex-row gap-4 relative group transition-all hover:bg-card/80">
      <Link to={`/event/${event.id}`} className="block w-full sm:w-32 h-32 sm:h-auto flex-shrink-0">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover rounded-xl" />
      </Link>
      <div className="flex-grow">
        <Link to={`/event/${event.id}`}>
          <h3 className="font-bold text-lg group-hover:text-brand-purple transition-colors">{event.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{event.date} at {event.time}</p>
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{event.location}</span>
          </div>
        </Link>
        {status === 'PENDING' && (
          <div className="mt-4 flex gap-2">
            <Button onClick={() => setRsvpStatus(event.id, 'YES')} size="sm" className="bg-green-500 hover:bg-green-600">Yes</Button>
            <Button onClick={() => setRsvpStatus(event.id, 'NO')} size="sm" variant="destructive">No</Button>
          </div>
        )}
        {status !== 'PENDING' && (
           <div className="mt-4">
             <p className="text-sm">Your RSVP: <span className={`font-bold ${status === 'YES' ? 'text-green-400' : 'text-red-400'}`}>{status}</span></p>
           </div>
        )}
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" onClick={() => removeRsvp(event.id)} aria-label="Remove RSVP">
          <Trash2 className="w-5 h-5 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default RsvpEventCard;
