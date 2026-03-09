import {
	SidebarInset,
	SidebarProvider,
} from "#src/1-components/ui/sidebar.tsx";

import { AppSidebar } from "./app-sidebar.tsx";
import { SiteHeader } from "./site-header.tsx";

export function AppLayout({ children }: React.PropsWithChildren) {
	return (
		<div className="[--header-height:calc(--spacing(14))]">
			<SidebarProvider className="flex flex-col">
				<div className="flex flex-1">
					<AppSidebar className="[view-transition-name:sidebar]" />
					<SidebarInset className="[view-transition-name:main-content]">
						<SiteHeader />
						<main className="pl-2">{children}</main>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	);
}
