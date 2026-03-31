import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ConvexReactClient } from "convex/react";

import { env } from "#common/env.tanstack.ts";

interface Context {
	queryClient: QueryClient;
	convexClient: ConvexReactClient;
	convexQueryClient: ConvexQueryClient;
	title: string;
}

// oxlint-disable-next-line init-declarations
let contextCache: Context;

function getContext() {
	if (contextCache) return contextCache;

	const convexClient = new ConvexReactClient(env.VITE_CONVEX_URL, { expectAuth: true });
	const convexQueryClient = new ConvexQueryClient(convexClient);
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
	});
	convexQueryClient.connect(queryClient);
	contextCache = { convexClient, convexQueryClient, title: "Home", queryClient };
	return contextCache;
}

export { getContext, Context };
