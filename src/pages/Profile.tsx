
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProfileForm from "@/components/EditProfileForm";
import HostedEventsList from "@/components/HostedEventsList";
import MyTicketsList from "@/components/MyTicketsList";

const Profile = () => {
  return (
    <div className="p-4 sm:p-6 animate-in fade-in duration-500 flex flex-col items-center w-full">
      <div className="w-full max-w-sm relative flex justify-center items-center mb-6">
        <Link to="/" className="absolute left-0">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-center tracking-tight">Profile</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-3 bg-card">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="hosted">Hosted</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <EditProfileForm />
        </TabsContent>
        <TabsContent value="hosted">
          <HostedEventsList />
        </TabsContent>
        <TabsContent value="tickets">
          <MyTicketsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
