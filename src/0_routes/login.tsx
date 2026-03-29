import { createFileRoute } from "@tanstack/react-router";

import { LoginPage } from "#src/1_components/auth/login";

export const Route = createFileRoute("/login")({
	component: Page,
});

function Page() {
	return (
		<div>
			<LoginPage />
		</div>
	)
}
