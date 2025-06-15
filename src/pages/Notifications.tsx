
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const navigate = useNavigate();
  // Dummy data for notifications
  const notifications = [
    { id: 1, text: "Sarah Lee started following you.", time: "2h ago" },
    { id: 2, text: "Your event 'Tech Meetup' is tomorrow.", time: "1d ago" },
    { id: 3, text: "Tom Holland RSVP'd to your event 'Design Workshop'.", time: "3d ago" },
  ];

  return (
    <div className="p-4 sm:p-6 animate-in fade-in duration-500 text-white flex flex-col items-center w-full">
      <div className="w-full max-w-sm relative flex justify-center items-center mb-6">
        <Button variant="ghost" size="icon" className="absolute left-0" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-center">Notifications</h1>
      </div>
      
      <div className="w-full max-w-sm space-y-4">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div key={notification.id} className="flex items-start gap-4 p-4 rounded-lg bg-card">
              <div className="bg-brand-purple/20 text-brand-purple p-2 rounded-full">
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p>{notification.text}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-10">
            <Bell className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">No notifications yet</h2>
            <p>You'll see updates about your events and connections here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
