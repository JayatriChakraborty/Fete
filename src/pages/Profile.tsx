
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProfileForm from "@/components/EditProfileForm";
import HostedEventsList from "@/components/HostedEventsList";

const Profile = () => {
  return (
    <div className="p-4 sm:p-6 animate-in fade-in duration-500 text-white flex flex-col items-center w-full">
      <div className="w-full max-w-sm flex justify-start items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
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
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <EditProfileForm />
        </TabsContent>
        <TabsContent value="hosted" className="mt-6">
          <HostedEventsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
