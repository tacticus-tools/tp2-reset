import { useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import { getContext } from "./app_query_context";

export function AppConvexProvider({ children }: { children: React.ReactNode }) {
	const { convexClient } = getContext();
	return (
		<ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
			{children}
		</ConvexProviderWithClerk>
	);
}
