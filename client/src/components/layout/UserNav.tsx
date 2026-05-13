import keycloak from "@/lib/keycloak";
import { Button } from "@/components/ui/button.tsx"
import { ChevronDown, LogOutIcon, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"

export const UserNav = () => {
  const username: string | undefined = keycloak.idTokenParsed?.preferred_username;
  const sub = keycloak.idTokenParsed?.sub;

  if (!keycloak.authenticated) {
    return (
      <Button onClick={() => keycloak.login()} className="gap-2 rounded-full">
        <User className="h-4 w-4" /> Войти
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto justify-start gap-2 border-none bg-background px-2 py-1.5 hover:bg-primary focus-visible:ring-0 dark:hover:bg-primary"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={`/api/users/${sub}/avatar`}
              alt={username}
            />
            <AvatarFallback className="rounded-lg">
              {username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="ml-auto size-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[160px]"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuItem>
          <User className="mr-2 size-4" />
          Профиль
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => keycloak.logout()}>
          <LogOutIcon className="mr-2 size-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};