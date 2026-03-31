import type { AuthConfig } from "convex/server";

import { env } from "#common/env.convex";

const config = {
	providers: [
		{
			domain: env.CLERK_FRONTEND_API_URL,
			applicationID: "convex",
		},
	],
} satisfies AuthConfig;

export default config;
