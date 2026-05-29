import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@supabase/supabase-js";
import { useAuth } from "../../features/auth/AuthContext";

const ACCOUNT_HREF = "/minha-conta";

export function getUserDisplayName(user: User | null) {
  const metadataName = typeof user?.user_metadata?.name === "string" ? user.user_metadata.name : "";
  return metadataName.trim() || user?.email?.split("@")[0] || "Usuário";
}

export function getUserDisplayEmail(user: User | null) {
  return user?.email?.trim() ?? "";
}

export function getUserInitial(user: User | null) {
  const displayName = getUserDisplayName(user);
  const displayEmail = getUserDisplayEmail(user);
  const firstName = displayName.split(/\s+/)[0];

  return (firstName || displayEmail || "U").charAt(0).toUpperCase();
}

type UserMenuProps = {
  onAction?: () => void;
  triggerClassName?: string;
};

export function UserMenu({ onAction, triggerClassName }: UserMenuProps) {
  const { user, signOut } = useAuth();
  const displayName = getUserDisplayName(user);
  const displayEmail = getUserDisplayEmail(user);
  const initial = getUserInitial(user);

  if (!user) return null;

  async function handleSignOut() {
    onAction?.();
    await signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Minha conta"
          className={`group inline-flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            triggerClassName ?? "size-6"
          }`}
          title={displayName}
          type="button"
        >
          <Avatar className="size-6 bg-muted text-black">
            <AvatarFallback className="bg-muted text-[11px] font-semibold leading-none text-black transition-colors group-hover:bg-accent">
              {initial}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="min-w-45">
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
          {displayEmail ? (
            <p className="truncate text-xs text-muted-foreground">{displayEmail}</p>
          ) : null}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href={ACCOUNT_HREF} onClick={onAction}>
            Minha conta
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => void handleSignOut()}>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
