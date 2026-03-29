import { routeTree } from "#src/routeTree.gen.ts";
import { Link, createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { getContext } from "#src/2_integrations/convex_and_query_context.ts";
import { QueryProvider } from "#src/2_integrations/convex_and_query.tsx";

import { Button } from "#src/1_components/ui/button";

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
		defaultNotFoundComponent: () => (
			<div>
				<p>Not found!</p>
				<Button>
					<Link to="/">Go home</Link>
				</Button>
			</div>
		),
	});

	setupRouterSsrQueryIntegration({
		queryClient: rqContext.queryClient,
		router,
	});

	return router;
};
