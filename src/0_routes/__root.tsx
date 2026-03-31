import appCss from "#src/styles.css?url";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";

import { AppClerkProvider } from "#src/2_integrations/app_clerk_provider.tsx";
import { AppConvexProvider } from "#src/2_integrations/app_convex_provider.tsx";
import { AppPostHogProvider } from "#src/2_integrations/app_posthog_provider.tsx";
import type { Context } from "#src/2_integrations/app_query_context.ts";
import { AppQueryProvider } from "#src/2_integrations/app_query_provider.tsx";

import { AppLayout } from "#src/1_components/app/app_layout.tsx";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRouteWithContext<Context>()({
	head: () => ({
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{ rel: "manifest", href: "/site.webmanifest", color: "#ffffff" },
			{ rel: "icon", href: "/favicon.ico" },
		],
		meta: [
			{ charSet: "utf8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Tacticus Planner" },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<AppClerkProvider>
			<AppConvexProvider>
				<AppQueryProvider>
					<AppPostHogProvider>
						<html lang="en" suppressHydrationWarning>
							<head>
								{/* oxlint-disable-next-line react/no-danger */}
								<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
								<HeadContent />
							</head>
							<body>
								<AppLayout>
									<Outlet />
								</AppLayout>
								<Scripts />
							</body>
						</html>
					</AppPostHogProvider>
				</AppQueryProvider>
			</AppConvexProvider>
		</AppClerkProvider>
	);
}
