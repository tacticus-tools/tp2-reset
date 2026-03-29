// React provider components for Convex and TanStack Query integrations.

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { getContext } from "#src/2_integrations/convex_and_query_context.ts";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
	const { queryClient, convexQueryClient } = getContext();
	return (
		<QueryClientProvider client={queryClient}>
			<ConvexAuthProvider client={convexQueryClient.convexClient}>{children}</ConvexAuthProvider>
		</QueryClientProvider>
	);
};
