import { Link, createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { Button } from "#src/1_components/ui/button";

import { getContext } from "./2_integrations/app_query_context";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
	const context = getContext();
	const router = createTanStackRouter({
		routeTree,
		defaultPreload: "intent",
		// DefaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => (
			<div>
				<p>Not found!</p>
				<Button>
					<Link to="/">Go home</Link>
				</Button>
			</div>
		),
		context,
		scrollRestoration: true,
	});
	setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient });

	return router;
};
