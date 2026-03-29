import { env } from "#common/env.server";

const config = {
	providers: [
		{
			domain: env.CONVEX_SITE_URL,
			applicationID: "convex",
		},
	],
};

export default config;
