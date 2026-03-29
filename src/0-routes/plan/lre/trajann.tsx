import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plan/lre/trajann")({
	component: RouteComponent,
	context: () => ({ title: "Trajann" }),
});

function RouteComponent() {
	return <div>Hello /plan/lre/trajann!</div>;
}
