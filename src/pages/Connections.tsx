
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserListItem from '@/components/UserListItem';
import { Card, CardContent } from '@/components/ui/card';

// Dummy data for demonstration
const allUsers = [
    { id: 1, name: 'Sarah Lee', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { id: 2, name: 'Tom Holland', avatar: 'https://i.pravatar.cc/150?u=tom' },
    { id: 3, name: 'Chris Evans', avatar: 'https://i.pravatar.cc/150?u=chris' },
    { id: 4, name: 'Emma Watson', avatar: 'https://i.pravatar.cc/150?u=emma' },
];

const initialFollowers = [allUsers[0], allUsers[2]];
const initialFollowing = [allUsers[0], allUsers[1], allUsers[3]];

const Connections = () => {
  const [following, setFollowing] = useState(initialFollowing);

  const handleToggleFollow = (userId: number) => {
    setFollowing(currentFollowing => {
      const isCurrentlyFollowing = currentFollowing.some(u => u.id === userId);
      if (isCurrentlyFollowing) {
        return currentFollowing.filter(u => u.id !== userId);
      } else {
        const userToFollow = allUsers.find(u => u.id === userId);
        return userToFollow ? [...currentFollowing, userToFollow] : currentFollowing;
      }
    });
  };

  const followingIds = following.map(u => u.id);

  return (
    <div className="p-4 sm:p-6 animate-in fade-in duration-500 text-white flex flex-col items-center w-full">
      <div className="w-full max-w-md flex justify-start items-center mb-6">
        <h1 className="text-2xl font-bold">Connections</h1>
      </div>

      <Tabs defaultValue="following" className="w-full max-w-md">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="following"
            className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            Following
          </TabsTrigger>
          <TabsTrigger
            value="followers"
            className="relative h-10 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            Followers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="following" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {following.map(user => (
                  <UserListItem key={user.id} user={user} isFollowing={true} onToggleFollow={handleToggleFollow} />
                ))}
                {following.length === 0 && <p className="text-muted-foreground text-center p-6">You are not following anyone yet.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="followers" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {initialFollowers.map(user => (
                  <UserListItem key={user.id} user={user} isFollowing={followingIds.includes(user.id)} onToggleFollow={handleToggleFollow} />
                ))}
                {initialFollowers.length === 0 && <p className="text-muted-foreground text-center p-6">You have no followers yet.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Connections;
