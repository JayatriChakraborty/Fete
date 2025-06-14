
import { Event } from '@/lib/data';
import { MapPin } from 'lucide-react';

type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="relative w-64 h-80 rounded-3xl overflow-hidden flex-shrink-0">
      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-5 w-full">
        <h3 className="font-bold text-lg text-white">{event.title}</h3>
        <p className="text-sm text-gray-300 mt-1">{event.date}</p>
        <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-300" />
                <span className="text-xs text-gray-300">{event.location}</span>
            </div>
            <button className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
                View
            </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
