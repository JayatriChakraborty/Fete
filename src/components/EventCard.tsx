
import { Event } from '@/lib/data';
import { MapPin, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link to={`/event/${event.id}`} className="block h-80 group">
      <div className="relative w-full h-full rounded-3xl overflow-hidden">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {event.isPrivate && (
          <div className="absolute top-4 right-4 bg-card/70 backdrop-blur-sm p-2 rounded-full flex items-center gap-2">
            <Lock className="w-4 h-4 text-white" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 p-5 w-full">
          <h3 className="font-bold text-lg text-white">{event.title}</h3>
          <p className="text-sm text-gray-300 mt-1">{event.date}</p>
          <div className="flex items-center gap-2 mt-4">
              <MapPin className="w-4 h-4 text-gray-300" />
              <span className="text-xs text-gray-300">{event.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
