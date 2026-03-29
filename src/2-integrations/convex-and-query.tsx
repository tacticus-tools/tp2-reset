// React provider components for Convex and TanStack Query integrations.

import { QueryClientProvider } from "@tanstack/react-query";
import { ConvexProvider } from "convex/react";
import type { ReactNode } from "react";

import { getContext } from "#src/2-integrations/convex-and-query-context.ts";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
	const { queryClient, convexQueryClient } = getContext();
	return (
		<QueryClientProvider client={queryClient}>
			<ConvexProvider client={convexQueryClient.convexClient}>{children}</ConvexProvider>
		</QueryClientProvider>
	);
};
