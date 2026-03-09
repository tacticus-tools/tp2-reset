import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { getContext } from "#src/2-integrations/convex-and-query.tsx";

import { AppLayout } from "#src/1-components/app/app-layout.tsx";
import { TooltipProvider } from "#src/1-components/ui/tooltip.tsx";

import appCss from "#src/styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

const { queryClient } = getContext();

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
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
