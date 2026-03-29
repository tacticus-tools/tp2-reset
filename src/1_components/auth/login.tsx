import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate } from "@tanstack/react-router";
import { useConvexAuth } from "convex/react";
import { useState, useEffect } from "react";

export function LoginPage() {
	const { isAuthenticated } = useConvexAuth();
	const navigate = useNavigate();
	const { signIn } = useAuthActions();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

	useEffect(() => {
		if (isAuthenticated) void navigate({ to: "/" });
	}, [isAuthenticated, navigate]);

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		setError(undefined);
		setLoading(true);
		try {
			await signIn("password", { email, password, flow: mode });
		} catch (error) {
			setError(error instanceof Error ? error.message : "Authentication failed");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-[80vh] flex items-center justify-center">
			<div className="w-full max-w-sm">
				<h1 className="text-2xl font-semibold mb-1 text-gray-900">
					{mode === "signIn" ? "Sign in" : "Create account"}
				</h1>
				<p className="text-sm text-gray-500 mb-6">
					{mode === "signIn"
						? "Enter your credentials to continue."
						: "Create a new account to get started."}
				</p>

				<form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-3">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="auth-input-field"
							placeholder="you@example.com"
							autoComplete="email"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
						<input
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="auth-input-field"
							placeholder="••••••••"
							autoComplete={mode === "signIn" ? "current-password" : "new-password"}
						/>
					</div>

					{error && (
						<p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
							{error}
						</p>
					)}

					<button type="submit" disabled={loading} className="auth-button mt-1">
						{loading ? "Loading…" : (mode === "signIn" ? "Sign in" : "Create account")}
					</button>
				</form>

				<p className="text-sm text-gray-500 mt-4 text-center">
					{mode === "signIn" ? "Don't have an account?" : "Already have an account?"}{" "}
					<button
						type="button"
						onClick={() => {
							setMode(mode === "signIn" ? "signUp" : "signIn");
							setError(undefined);
						}}
						className="text-gray-900 underline font-medium"
					>
						{mode === "signIn" ? "Sign up" : "Sign in"}
					</button>
				</p>
			</div>
		</div>
	);
}
