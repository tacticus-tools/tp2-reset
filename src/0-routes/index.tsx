import { createFileRoute } from "@tanstack/react-router";

import { DemoForm } from "#src/1-components/demo-form.tsx";

export const Route = createFileRoute("/")({
	component: Page,
	staticData: { getTitle: () => "Home" },
});

function Page() {
	return (
		<div>
			<DemoForm />
		</div>
	);
}
