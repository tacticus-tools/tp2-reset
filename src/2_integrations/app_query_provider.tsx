import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { getContext } from "./app_query_context";

function AppQueryProvider({ children }: { children: ReactNode }) {
	const { queryClient } = getContext();

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export { AppQueryProvider };
