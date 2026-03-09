import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { getContext } from "#src/2-integrations/tanstack-query/root-provider.tsx";

import { routeTree } from "#src/routeTree.gen.ts";

// Create a new router instance
export const getRouter = () => {
	const rqContext = getContext();

	const router = createRouter({
		routeTree,
		context: {
			...rqContext,
		},

		defaultPreload: "intent",
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	return router;
};
