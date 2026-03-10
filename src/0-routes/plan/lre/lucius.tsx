import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plan/lre/lucius")({
	component: RouteComponent,
	context: () => ({ title: "Lucius" }),
});

function RouteComponent() {
	return <div>Hello "/plan/lre/lucius"!</div>;
}
