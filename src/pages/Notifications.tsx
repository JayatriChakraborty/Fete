
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Notifications = () => {
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
      <div className="w-full max-w-sm text-center mt-8">
        <p className="text-muted-foreground">You have no new notifications.</p>
      </div>
    </div>
  );
};

export default Notifications;
