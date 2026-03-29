import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plan/lre")({
	context: () => ({ title: "Legendary Release Events" }),
});
