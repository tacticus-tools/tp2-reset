// oxlint-disable react/jsx-max-depth -- the way the shadcn sidebar is architected makes the nesting deep
"use client";

import { Link } from "@tanstack/react-router";
import {
	BadgeCheckIcon,
	ChevronsUpDownIcon,
	LogOutIcon,
	MonitorIcon,
	MoonIcon,
	SunIcon,
} from "lucide-react";

import { useUserPreferencesStore } from "#src/3_hooks/use_user_preferences_store";

import { Avatar, AvatarFallback, AvatarImage } from "#src/1_components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "#src/1_components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "#src/1_components/ui/sidebar";

const THEME_OPTIONS = [
	{ icon: SunIcon, label: "Light", value: "light" as const },
	{ icon: MoonIcon, label: "Dark", value: "dark" as const },
	{ icon: MonitorIcon, label: "System", value: "system" as const },
];

// oxlint-disable-next-line max-lines-per-function
export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	const { isMobile } = useSidebar();
	const { theme, setTheme } = useUserPreferencesStore();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}
					>
						<Avatar>
							<AvatarImage src={user.avatar} alt={user.name} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm/tight">
							<span className="truncate font-medium">{user.name}</span>
							<span className="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDownIcon className="ml-auto size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar>
										<AvatarImage src={user.avatar} alt={user.name} />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm/tight">
										<span className="truncate font-medium">{user.name}</span>
										<span className="truncate text-xs">{user.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
								Theme
							</DropdownMenuLabel>
							{THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
								<DropdownMenuItem
									key={value}
									onClick={() => setTheme(value)}
									className={theme === value ? "bg-accent" : ""}
								>
									<Icon className="size-4" />
									{label}
									{theme === value && <span className="ml-auto text-xs font-semibold">✓</span>}
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Link to="/settings" className="flex w-full items-center gap-2">
									<BadgeCheckIcon />
									Settings
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogOutIcon />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
