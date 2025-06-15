
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProfileForm from "@/components/EditProfileForm";
import HostedEventsList from "@/components/HostedEventsList";
import MyTicketsList from "@/components/MyTicketsList";

const Profile = () => {
  return (
    <div className="p-4 sm:p-6 animate-in fade-in duration-500 text-white flex flex-col items-center w-full">
      <div className="w-full max-w-sm relative flex justify-center items-center mb-6">
        <Link to="/" className="absolute left-0">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-center">Profile</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full max-w-sm">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="profile"
            className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="hosted"
            className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            Hosted
          </TabsTrigger>
          <TabsTrigger
            value="tickets"
            className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            Tickets
          </TabsTrigger>
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
