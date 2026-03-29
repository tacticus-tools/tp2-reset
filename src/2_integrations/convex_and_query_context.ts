/* Creates Convex and TanStack Query clients as a memoized singleton in the
   browser, or a fresh instance per call on the server, to prevent cache and
   subscription leaks across SSR requests.

   We're not currently using SSR but I don't want to leave it as a land mine
   for future devs
   */

import { env } from "#src/env.ts";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";

interface Context {
	convexQueryClient: ConvexQueryClient;
	queryClient: QueryClient;
}

function createContext(): Context {
	const convexQueryClient = new ConvexQueryClient(env.VITE_CONVEX_URL);
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryFn: convexQueryClient.queryFn(),
				queryKeyHashFn: convexQueryClient.hashFn(),
			},
		},
	});
	convexQueryClient.connect(queryClient);
	return { convexQueryClient, queryClient };
}

// oxlint-disable-next-line unicorn/no-null
let _ctx: Context | null = null;

function getContext(): Context {
	// oxlint-disable-next-line unicorn/prefer-global-this
	if (typeof window === "undefined") return createContext(); // SSR: fresh per call
	return _ctx ?? ((_ctx as unknown as Context) = createContext()); // Browser: memoized
}

export { getContext };
