import { AppSidebar } from "#src/1_components/app/sidebar";
import { SiteHeader } from "#src/1_components/app/site_header";
import { SidebarInset, SidebarProvider } from "#src/1_components/ui/sidebar";

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
