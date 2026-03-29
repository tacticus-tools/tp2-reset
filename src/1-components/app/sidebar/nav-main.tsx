// oxlint-disable react/jsx-max-depth -- the way the shadcn sidebar is architected makes the nesting deep
"use client";

import { Link } from "@tanstack/react-router";
import { ChevronRightIcon, Sword } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "#src/1-components/ui/collapsible.tsx";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "#src/1-components/ui/sidebar.tsx";

export function NavMain() {
	return (
		<>
			<SidebarGroup>
				<SidebarGroupLabel>Plan</SidebarGroupLabel>
				<SidebarMenu>
					<Collapsible defaultOpen className="group/collapsible" render={<SidebarMenuItem />}>
						<CollapsibleTrigger render={<SidebarMenuButton tooltip="Legendary Release Events" />}>
							<Sword />
							<span>Legendary Release Events</span>
							<ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
						</CollapsibleTrigger>
						<CollapsibleContent>
							<SidebarMenuSub>
								<SidebarMenuSubItem>
									<SidebarMenuSubButton
										render={<Link to="/plan/lre/trajann" />}
										children="Trajann"
									/>
								</SidebarMenuSubItem>
								<SidebarMenuSubItem>
									<SidebarMenuSubButton render={<Link to="/plan/lre/lucius" />} children="Lucius" />
								</SidebarMenuSubItem>
							</SidebarMenuSub>
						</CollapsibleContent>
					</Collapsible>
				</SidebarMenu>
			</SidebarGroup>
			<SidebarGroup>
				<SidebarGroupLabel>Learn</SidebarGroupLabel>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton render={<Link to="/" />} children="Onslaught" />
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton render={<Link to="/" />} children="Salvage Run" />
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton render={<Link to="/" />} children="Equipment" />
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton render={<Link to="/" />} children="Upgrades" />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
		</>
	);
}
