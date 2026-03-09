import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
	component: RouteComponent,
	staticData: { getTitle: () => "Settings" },
});

function RouteComponent() {
	return <div>Hello "/settings"!</div>;
}
