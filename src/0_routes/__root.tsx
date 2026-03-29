// oxlint-disable import/max-dependencies -- glue file
import appCss from "#src/styles.css?url";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { getContext } from "#src/2_integrations/convex_and_query_context.ts";

import { AppLayout } from "#src/1_components/app/app_layout";
import { TooltipProvider } from "#src/1_components/ui/tooltip";

interface MyRouterContext {
	queryClient: QueryClient;
	title: string;
}

const { queryClient } = getContext();

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		links: [{ href: appCss, rel: "stylesheet" }],
		meta: [
			{ charSet: "utf8" },
			{ content: "width=device-width, initial-scale=1", name: "viewport" },
			{ title: "TP2 Reset" },
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
	return (
		// Suppress the hydration warning that occurs from `className="dark"` being added to the document element on the client, which is required for dark mode support.
		// Default to dark mode to prevent a flash of light mode for dark mode users on initial load - less jarring for a flash of dark for light mode users
		<html lang="en" className="dark" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<TooltipProvider>
					<AppLayout>{children}</AppLayout>
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{ name: "Router", render: <TanStackRouterDevtoolsPanel /> },
							{
								name: "Query",
								render: <ReactQueryDevtoolsPanel client={queryClient} />,
							},
							formDevtoolsPlugin(),
						]}
					/>
					<Toaster richColors theme="system" />
					<Scripts />
				</TooltipProvider>
			</body>
		</html>
	);
}
