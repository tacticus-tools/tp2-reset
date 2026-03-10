import { createRouter, Link } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import {
	getContext,
	QueryProvider,
} from "#src/2-integrations/convex-and-query.tsx";

import { Button } from "#src/1-components/ui/button.tsx";

import { routeTree } from "#src/routeTree.gen.ts";

declare module "@tanstack/react-router" {
	interface StaticDataRouteOption {
		getTitle: () => string;
		getDescription?: () => string;
	}
}

export const getRouter = () => {
	const rqContext = getContext();

	const router = createRouter({
		routeTree,
		Wrap: ({ children }) => <QueryProvider>{children}</QueryProvider>, // Wrapped at the router level to allow for preloading data on intent
		context: { ...rqContext },
		defaultPreload: "intent",
		scrollRestoration: true,
		defaultStructuralSharing: true,
		defaultPreloadStaleTime: 0,
		defaultViewTransition: {
			types: ({ fromLocation, toLocation }) => {
				if (!fromLocation) return [];
				const { pathname: fromPath } = fromLocation;
				const { pathname: toPath } = toLocation;
				if (toPath === fromPath) return [];
				if (toPath.startsWith(fromPath)) return ["slide-left"]; // enter nested route
				if (fromPath.startsWith(toPath)) return ["slide-right"]; // exit nested route
				return [];
			},
		},
		defaultNotFoundComponent: () => {
			return (
				<div>
					<p>Not found!</p>
					<Button>
						<Link to="/">Go home</Link>
					</Button>
				</div>
			);
		},
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	return router;
};
