import { createFileRoute } from "@tanstack/react-router";
import { DemoForm } from "#src/1-components/demo-form";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div>
			<DemoForm />
		</div>
	);
}
