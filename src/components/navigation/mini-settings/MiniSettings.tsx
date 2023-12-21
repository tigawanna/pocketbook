import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { CurrentUserSection } from "./CurrentUserSection";
import { ThemeToggle } from "./ThemeToggle";
import { useUser } from "@/lib/rakkas/hooks/useUser";

interface MiniSettingsModalProps {}

export function MiniSettingsModal({}: MiniSettingsModalProps) {
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu modal open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button  className="relative h-7 w-7 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt="@shadcn" />
            <AvatarFallback>{user?.username?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 " align="end" forceMount>
        <DropdownMenuSeparator />

        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}

        <DropdownMenuSeparator />
        {/* theme toggle */}
        <ThemeToggle />
        <DropdownMenuSeparator />
        {/* logout button */}
        <CurrentUserSection setOpen={setOpen} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
