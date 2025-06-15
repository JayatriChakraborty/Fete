
import { Event } from '@/lib/data';
import { RsvpStatus, useRSVP } from '@/contexts/RSVPContext';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion, type PanInfo } from 'framer-motion';

type RsvpEventCardProps = {
  event: Event;
  status: RsvpStatus;
};

const RsvpEventCard = ({ event, status }: RsvpEventCardProps) => {
  const { setRsvpStatus, removeRsvp } = useRSVP();

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -100) {
      removeRsvp(event.id);
    }
  };

  return (
    <motion.div
      layout
      exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="bg-card/50 p-3 rounded-xl flex items-center gap-4 relative group transition-colors hover:bg-card cursor-grab active:cursor-grabbing"
    >
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

      <div className="flex-shrink-0 flex flex-col items-center gap-2 pl-2">
        {status === 'PENDING' && (
          <>
            <Button
              onClick={() => setRsvpStatus(event.id, 'YES')}
              variant="outline"
              size="sm"
              className="rounded-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white p-2 sm:px-3"
            >
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline sm:ml-1">Yes</span>
            </Button>
            <Button
              onClick={() => setRsvpStatus(event.id, 'NO')}
              variant="outline"
              size="sm"
              className="rounded-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white p-2 sm:px-3"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline sm:ml-1">No</span>
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
    </motion.div>
  );
};

export default RsvpEventCard;
