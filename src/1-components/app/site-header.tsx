import { Link, useLocation, useMatches } from "@tanstack/react-router";
import { Fragment } from "react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "#src/1-components/ui/breadcrumb.tsx";
import { Separator } from "#src/1-components/ui/separator.tsx";
import { SidebarTrigger } from "#src/1-components/ui/sidebar.tsx";

function hasLinkTitle<T extends ReturnType<typeof useMatches>[number]>(
	route: T,
): route is T & { options: { staticData: { getTitle: () => string } } } {
	return typeof route.staticData?.getTitle === "function";
}

export function SiteHeader() {
	const pathname = useLocation({ select: (loc) => loc.pathname });
	const matches = useMatches();
	if (matches.some((match) => match.status === "pending")) return null;

	return (
		<header className="flex h-16 shrink-0 items-center gap-2">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						{matches.filter(hasLinkTitle).map((match) => (
							<Fragment key={match.id}>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									{match.pathname !== pathname && (
										<BreadcrumbLink>
											<Link to={match.pathname}>
												{match.staticData.getTitle()}
											</Link>
										</BreadcrumbLink>
									)}
									{match.pathname === pathname && (
										<BreadcrumbPage>
											{match.staticData.getTitle()}
										</BreadcrumbPage>
									)}
								</BreadcrumbItem>
							</Fragment>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
