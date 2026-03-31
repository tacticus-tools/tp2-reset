import { ClerkProvider } from "@clerk/clerk-react";

import { env } from "#common/env.tanstack";

export function AppClerkProvider({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
			{children}
		</ClerkProvider>
	);
}
