
import { useState } from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserListItem from '@/components/UserListItem';

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
      <div className="w-full max-w-sm relative flex justify-center items-center mb-6">
        <Link to="/" className="absolute left-0">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-center">Connections</h1>
      </div>

      <Tabs defaultValue="following" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-2 bg-card">
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
        </TabsList>
        <TabsContent value="following" className="mt-6">
          <div className="space-y-2">
            {following.map(user => (
              <UserListItem key={user.id} user={user} isFollowing={true} onToggleFollow={handleToggleFollow} />
            ))}
            {following.length === 0 && <p className="text-muted-foreground text-center pt-4">You are not following anyone yet.</p>}
          </div>
        </TabsContent>
        <TabsContent value="followers" className="mt-6">
          <div className="space-y-2">
            {initialFollowers.map(user => (
              <UserListItem key={user.id} user={user} isFollowing={followingIds.includes(user.id)} onToggleFollow={handleToggleFollow} />
            ))}
            {initialFollowers.length === 0 && <p className="text-muted-foreground text-center pt-4">You have no followers yet.</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Connections;
