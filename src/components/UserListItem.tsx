
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

type UserListItemProps = {
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  isFollowing: boolean;
  onToggleFollow: (userId: number) => void;
};

const UserListItem = ({ user, isFollowing, onToggleFollow }: UserListItemProps) => {
  return (
    <div className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-card/50">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
        <span className="font-semibold">{user.name}</span>
      </div>
      <Button
        variant={isFollowing ? "outline" : "default"}
        onClick={() => onToggleFollow(user.id)}
        size="sm"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default UserListItem;
