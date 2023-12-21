import { useUser } from "@/lib/rakkas/hooks/useUser";
import { UserCircle2 } from "lucide-react";

interface UserCircleProps {}

export function UserCircle({}: UserCircleProps) {
  const { user, user_avatar } = useUser();

  return (
    <div className="w-7 h-7 flex items-center justify-center rounded-full">
      {user?.email ? (
        <img
          src={user_avatar}
          alt="avatar"
          className="w-7 h-7 rounded-full object-cover"
        />
      ) : (
        <UserCircle2 className="w-7 h-7 rounded-full" />
      )}
    </div>
  );
}
