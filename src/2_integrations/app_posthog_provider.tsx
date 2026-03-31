import { PostHogProvider as BasePostHogProvider } from "@posthog/react";
// oxlint-disable-next-line import/no-named-as-default
import posthog from "posthog-js";
import type { ReactNode } from "react";

import { env } from "#common/env.tanstack.ts";

// oxlint-disable-next-line unicorn/prefer-global-this
if (typeof window !== "undefined" && env.VITE_POSTHOG_KEY) {
	posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
		api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
		person_profiles: "identified_only",
		capture_pageview: false,
		defaults: "2025-11-30",
	});
}

interface PostHogProviderProps {
	children: ReactNode;
}

export function AppPostHogProvider({ children }: PostHogProviderProps) {
	return <BasePostHogProvider client={posthog}>{children}</BasePostHogProvider>;
}
