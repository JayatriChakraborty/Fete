
import { Event } from '@/lib/data';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar } from 'lucide-react';
import { useSavedEvents } from '@/contexts/SavedEventsContext';
import { motion, type PanInfo } from 'framer-motion';

type SavedEventListItemProps = {
  event: Event;
};

const SavedEventListItem = ({ event }: SavedEventListItemProps) => {
  const { toggleSaveEvent } = useSavedEvents();

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -100) {
      toggleSaveEvent(event.id);
    }
  };

  return (
    <motion.div
      layout
      exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="bg-card hover:bg-muted/50 transition-colors">
        <CardContent className="p-0">
          <Link to={`/event/${event.id}`} className="flex items-center gap-4 group p-4">
            <img src={event.imageUrl} alt={event.title} className="w-20 h-20 object-cover rounded-md" />
            <div className="flex-grow">
              <h3 className="font-semibold text-base text-white group-hover:text-primary transition-colors">{event.title}</h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{event.date} at {event.time}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{event.location}</span>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SavedEventListItem;
