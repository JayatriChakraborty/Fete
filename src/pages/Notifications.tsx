
import { Link } from "react-router-dom";
import { ArrowLeft, UserPlus, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';

// Data and types are included here as creating new files is not possible in this context.
type NotificationType = "NEW_FOLLOWER" | "NEW_EVENT";

interface Notification {
  id: string;
  type: NotificationType;
  text: string;
  timestamp: string;
  read: boolean;
  relatedId?: string; // e.g., user id for follower, event id for event
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "NEW_EVENT",
    text: "New Event: 'Summer Music Festival' is happening near you!",
    timestamp: "2025-06-15T10:00:00Z",
    read: false,
    relatedId: '1',
  },
  {
    id: "2",
    type: "NEW_FOLLOWER",
    text: "Jane Doe started following you.",
    timestamp: "2025-06-14T18:30:00Z",
    read: false,
    relatedId: 'user-2',
  },
    {
    id: "3",
    type: "NEW_EVENT",
    text: "New Event: 'Art & Wine Night' is happening near you!",
    timestamp: "2025-06-14T12:00:00Z",
    read: true,
    relatedId: '2',
  },
];


const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
    switch (type) {
        case "NEW_FOLLOWER":
            return <UserPlus className="h-6 w-6 text-blue-500" />;
        case "NEW_EVENT":
            return <CalendarPlus className="h-6 w-6 text-brand-purple" />;
        default:
            return null;
    }
}

const NotificationItem = ({ notification }: { notification: Notification }) => {
    return (
        <div className={cn(
            "flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-card/50",
            !notification.read && "bg-card/80"
        )}>
            <div className="flex-shrink-0 mt-1">
                <NotificationIcon type={notification.type} />
            </div>
            <div className="flex-1">
                <p className="text-white leading-snug">{notification.text}</p>
                <p className="text-sm text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                </p>
            </div>
            {!notification.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-brand-purple self-center flex-shrink-0"></div>
            )}
        </div>
    )
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch notifications from a server.
    // Here we use mock data and sort it to show unread and recent items first.
    const sortedNotifications = [...mockNotifications].sort((a, b) => {
        if (a.read !== b.read) {
            return a.read ? 1 : -1;
        }
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    setNotifications(sortedNotifications);
  }, []);

  return (
    <div className="p-4 sm:p-6 animate-in fade-in duration-500 text-white flex flex-col items-center w-full">
      <div className="w-full max-w-sm relative flex justify-center items-center mb-6">
        <Link to="/" className="absolute left-0">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-center">Notifications</h1>
      </div>
      <div className="w-full max-w-sm mt-2 space-y-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="text-center mt-8">
            <p className="text-muted-foreground">You have no new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
