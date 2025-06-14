
import { Event } from '@/lib/data';
import EventCard from '@/components/EventCard';

type EventSectionProps = {
  title: string;
  events: Event[];
};

const EventSection = ({ title, events }: EventSectionProps) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default EventSection;
