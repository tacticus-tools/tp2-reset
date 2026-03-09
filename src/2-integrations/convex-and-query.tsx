// Setup for Convex and Tanstack Query integrations.
// While technically distinct, their setup is intertwined so I put them together for simplicity.

import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexProvider } from "convex/react";
import type { ReactNode } from "react";

import { env } from "#src/env.ts";

const convexQueryClient = new ConvexQueryClient(env.VITE_CONVEX_URL);

const queryClient: QueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryKeyHashFn: convexQueryClient.hashFn(),
			queryFn: convexQueryClient.queryFn(),
		},
	},
});
convexQueryClient.connect(queryClient);

export function getContext() {
	return { queryClient, convexQueryClient };
}

export const QueryProvider = ({ children }: { children: ReactNode }) => {
	const { queryClient } = getContext();
	return (
		<QueryClientProvider client={queryClient}>
			<ConvexProvider client={convexQueryClient.convexClient}>
				{children}
			</ConvexProvider>
		</QueryClientProvider>
	);
};
