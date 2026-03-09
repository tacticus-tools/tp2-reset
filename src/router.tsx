import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { routeTree } from "#src/routeTree.gen.ts";
import {
	getContext,
	QueryProvider,
} from "./2-integrations/convex-and-query.tsx";

export const getRouter = () => {
	const rqContext = getContext();

	const router = createRouter({
		routeTree,
		Wrap: ({ children }) => <QueryProvider>{children}</QueryProvider>, // Wrapped at the router level to allow for preloading data on intent
		context: { ...rqContext },
		defaultPreload: "intent",
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	return router;
};
