import type * as React from "react";

import { NavMain } from "#src/1-components/app/nav-main.tsx";
import { NavUser } from "#src/1-components/app/nav-user.tsx";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "#src/1-components/ui/sidebar.tsx";


import avatar from '#src/5-assets/images/snowprint_assets/characters/ui_image_RoundPortrait_adept_canoness_01.png'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>Tacticus Planner</SidebarHeader>
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarFooter>
				<NavUser
					user={{
						name: "shadcn",
						email: "m@example.com",
						avatar,
					}}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
