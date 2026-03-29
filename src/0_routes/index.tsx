import { createFileRoute } from "@tanstack/react-router";

import { DemoForm } from "#src/1_components/demo_form";

export const Route = createFileRoute("/")({
	component: Page,
});

function Page() {
	return (
		<div>
			<DemoForm />
		</div>
	);
}
