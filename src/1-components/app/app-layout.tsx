import { AppSidebar } from "#src/1-components/app/sidebar/index.tsx";
import { SiteHeader } from "#src/1-components/app/site-header.tsx";
import { SidebarInset, SidebarProvider } from "#src/1-components/ui/sidebar.tsx";

export function AppLayout({ children }: React.PropsWithChildren) {
	return (
		<div className="[--header-height:calc(--spacing(14))]">
			<SidebarProvider className="flex flex-col">
				<div className="flex flex-1">
					<AppSidebar />
					<SidebarInset>
						<SiteHeader />
						<main className="pl-2">{children}</main>
					</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	);
}
