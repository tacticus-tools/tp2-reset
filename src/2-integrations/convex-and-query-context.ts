/* Module-level setup for Convex and TanStack Query clients.
 Kept in a plain .ts file so it can be imported by both the QueryProvider
 component and non-component callers without mixing exports.  */

import { env } from "#src/env.ts";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";

export const convexQueryClient = new ConvexQueryClient(env.VITE_CONVEX_URL);

export const queryClient: QueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: convexQueryClient.queryFn(),
			queryKeyHashFn: convexQueryClient.hashFn(),
		},
	},
});

convexQueryClient.connect(queryClient);

export function getContext() {
	return { convexQueryClient, queryClient };
}
