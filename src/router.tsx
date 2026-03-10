import { createRouter, Link } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import {
	getContext,
	QueryProvider,
} from "#src/2-integrations/convex-and-query.tsx";

import { Button } from "#src/1-components/ui/button.tsx";

import { routeTree } from "#src/routeTree.gen.ts";

export const getRouter = () => {
	const rqContext = getContext();

	const router = createRouter({
		routeTree,
		Wrap: ({ children }) => <QueryProvider>{children}</QueryProvider>, // Wrapped at the router level to allow for preloading data on intent
		context: { ...rqContext, title: "Home" },
		defaultPreload: "intent",
		scrollRestoration: true,
		defaultStructuralSharing: true,
		defaultPreloadStaleTime: 0,
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
