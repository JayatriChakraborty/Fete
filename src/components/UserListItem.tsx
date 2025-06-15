
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";
import { User } from "@/lib/data";

type UserListItemProps = {
  user: User;
  isFollowing: boolean;
  onToggleFollow: (userId: number) => void;
};

const UserListItem = ({ user, isFollowing, onToggleFollow }: UserListItemProps) => {
  return (
    <div className="flex items-center justify-between w-full p-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback><UserIcon /></AvatarFallback>
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
