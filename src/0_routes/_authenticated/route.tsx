import { SignInButton, useUser } from "@clerk/clerk-react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

export const Route = createFileRoute("/_authenticated")({
	component: RouteComponent,
});

function RouteComponent() {
	const { isSignedIn, isLoaded } = useUser();

	if (!isLoaded) return <div className="p-4">Loading...</div>;

	if (!isSignedIn) return <div className="p-4">Sign in to view this page</div>;

	return (
		<>
			<Unauthenticated>
				<SignInButton />
			</Unauthenticated>
			<Authenticated>
				<Outlet />
			</Authenticated>
			<AuthLoading>
				<p>Still loading</p>
			</AuthLoading>
		</>
	);
}
