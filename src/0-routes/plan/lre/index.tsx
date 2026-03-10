import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plan/lre/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/plan/lre/"!</div>;
}
