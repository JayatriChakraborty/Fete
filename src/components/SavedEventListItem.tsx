
import { Event } from '@/lib/data';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Calendar } from 'lucide-react';

type SavedEventListItemProps = {
  event: Event;
};

const SavedEventListItem = ({ event }: SavedEventListItemProps) => {
  return (
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
  );
};

export default SavedEventListItem;
