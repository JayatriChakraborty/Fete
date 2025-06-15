
import { Event } from '@/lib/data';
import { RsvpStatus, useRSVP } from '@/contexts/RSVPContext';
import { Button } from '@/components/ui/button';
import { Trash2, MapPin, Calendar, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type RsvpEventCardProps = {
  event: Event;
  status: RsvpStatus;
};

const RsvpEventCard = ({ event, status }: RsvpEventCardProps) => {
  const { setRsvpStatus, removeRsvp } = useRSVP();

  return (
    <div className="bg-card/50 p-3 rounded-xl flex items-center gap-4 relative group transition-colors hover:bg-card">
      <Link to={`/event/${event.id}`} className="flex-shrink-0">
        <img src={event.imageUrl} alt={event.title} className="w-20 h-20 object-cover rounded-lg" />
      </Link>
      
      <div className="flex-grow overflow-hidden">
        <Link to={`/event/${event.id}`} className="space-y-1 block">
          <h3 className="font-semibold text-base text-white group-hover:text-primary transition-colors truncate">{event.title}</h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span>{event.date} at {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </Link>
      </div>

      <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-2 pl-2">
        {status === 'PENDING' && (
          <>
            <Button onClick={() => setRsvpStatus(event.id, 'YES')} size="sm" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto rounded-full px-4">
              <Check className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Yes</span>
            </Button>
            <Button onClick={() => setRsvpStatus(event.id, 'NO')} size="sm" variant="destructive" className="w-full sm:w-auto rounded-full px-4">
              <X className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">No</span>
            </Button>
          </>
        )}
        {status !== 'PENDING' && (
           <div
                className={cn('text-sm font-semibold flex items-center gap-2 px-3 py-1.5 rounded-full', {
                    'bg-green-500/10 text-green-400': status === 'YES',
                    'bg-red-500/10 text-red-400': status === 'NO'
                })}
           >
             {status === 'YES' ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
             <span className="hidden sm:inline">{status}</span>
           </div>
        )}
      </div>

      <Button variant="ghost" size="icon" onClick={() => removeRsvp(event.id)} aria-label="Remove RSVP" className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default RsvpEventCard;
