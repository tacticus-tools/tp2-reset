//
"use client";

import { Link } from "@tanstack/react-router";
import { ChevronRightIcon, Sword } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "#src/1_components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "#src/1_components/ui/sidebar";

//
export function NavMain() {
	return (
		<SidebarMenu>
			<SidebarGroup>
				<SidebarMenuItem>
					<SidebarMenuButton render={<Link to="/settings" />} children="Settings" />
				</SidebarMenuItem>
				<SidebarGroupLabel>Plan</SidebarGroupLabel>
				<Collapsible defaultOpen className="group/collapsible" render={<SidebarMenuItem />}>
					<CollapsibleTrigger render={<SidebarMenuButton tooltip="Legendary Release Events" />}>
						<Sword />
						<span>Legendary Release Events</span>
						<ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
					</CollapsibleTrigger>
					<CollapsibleContent>
						<SidebarMenuSub>
							<SidebarMenuSubItem>
								<SidebarMenuSubButton render={<Link to="/plan/lre/trajann" />} children="Trajann" />
							</SidebarMenuSubItem>
							<SidebarMenuSubItem>
								<SidebarMenuSubButton render={<Link to="/plan/lre/lucius" />} children="Lucius" />
							</SidebarMenuSubItem>
						</SidebarMenuSub>
					</CollapsibleContent>
				</Collapsible>
			</SidebarGroup>
			<SidebarGroup>
				<SidebarGroupLabel>Learn</SidebarGroupLabel>
				<SidebarMenuItem>
					<SidebarMenuButton render={<Link to="/" />} children="(FAKE) Onslaught" />
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton render={<Link to="/" />} children="(FAKE) Salvage Run" />
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton render={<Link to="/" />} children="(FAKE) Equipment" />
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton render={<Link to="/" />} children="(FAKE) Upgrades" />
				</SidebarMenuItem>
			</SidebarGroup>
		</SidebarMenu>
	);
}
