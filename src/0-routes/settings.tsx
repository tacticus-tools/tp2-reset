import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
	component: RouteComponent,
	context: () => ({ title: "Settings" }),
});

function RouteComponent() {
	return <div>Hello "/settings"!</div>;
}
