import { SignedIn, SignInButton, SignedOut, UserButton } from "@clerk/clerk-react";

import avatar from "#src/5_assets/images/snowprint_assets/characters/ui_image_RoundPortrait_adept_canoness_01.png";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "#src/1_components/ui/sidebar.tsx";

import { NavMain } from "./nav_main.tsx";
import { NavUser } from "./nav_user.tsx";

export function AppSidebar() {
	return (
		<Sidebar collapsible="offcanvas">
			<SidebarHeader>Tacticus Planner</SidebarHeader>
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					user={{
						avatar,
						email: "m@example.com",
						name: "shadcn",
					}}
				/>
				<SignedIn>
					<UserButton />
				</SignedIn>
				<SignedOut>
					<SignInButton />
				</SignedOut>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
