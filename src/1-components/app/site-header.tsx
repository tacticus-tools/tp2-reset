import { Link, useLocation, useRouterState } from "@tanstack/react-router";
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

export function SiteHeader() {
	const path = useLocation({ select: (location) => location.pathname });
	const { matches } = useRouterState();

	const breadcrumbs = matches
		.filter((match) => match.context.title)
		.map(({ pathname, context }) => ({
			path: pathname,
			title: context.title,
		}));

	return (
		<header className="flex h-16 shrink-0 items-center gap-2">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbs.map((match, index) => {
							// Index routes have the same path as their layout route with a slash added, so we skip them in the breadcrumbs
							if (match.path === `${path}/`) {
								return;
							}

							// The root route and root page have the same path, so only show the first one.
							if (match.path === "/" && index !== 0) {
								return;
							}

							return (
								<Fragment key={match.path}>
									{match.path !== path && (
										<>
											<BreadcrumbItem>
												<BreadcrumbLink render={<Link to={match.path} />}>
													{match.title}
												</BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
										</>
									)}
									{match.path === path && (
										<BreadcrumbItem>
											<BreadcrumbPage>{match.title}</BreadcrumbPage>
										</BreadcrumbItem>
									)}
								</Fragment>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
