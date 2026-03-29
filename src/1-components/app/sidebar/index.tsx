import avatar from "#src/5-assets/images/snowprint_assets/characters/ui_image_RoundPortrait_adept_canoness_01.png";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "#src/1-components/ui/sidebar.tsx";

import { NavMain } from "./nav-main.tsx";
import { NavUser } from "./nav-user.tsx";

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
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
