import { PostHogProvider } from "@posthog/react";
import type { ReactNode } from "react";

import { env } from "#common/env.tanstack.ts";

const options = {
  api_host: env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
} as const

interface PostHogProviderProps {
	children: ReactNode;
}

export function AppPostHogProvider({ children }: PostHogProviderProps) {
	return <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN} options={options}>{children}</PostHogProvider>;
}
