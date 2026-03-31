import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export function AppDevtools() {
	return (
		<TanStackDevtools
			config={{ position: "bottom-right" }}
			plugins={[
				{ name: "Router", render: <TanStackRouterDevtoolsPanel /> },
				{ name: "Query", render: <ReactQueryDevtoolsPanel /> },
				formDevtoolsPlugin(),
			]}
		/>
	);
}
