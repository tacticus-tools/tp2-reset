import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useForm } from "@tanstack/react-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useConvexAuth } from "convex/react";
import { useEffect } from "react";

import { userSettingsSchema } from "#common/schemas";

import { api } from "#convex/_generated/api";

export const Route = createFileRoute("/settings")({
	component: RouteComponent,
	context: () => ({ title: "Settings" }),
});

const MIN_MASK_LENGTH = 4;
function maskApiKey(key: string): string {
	if (key.length <= MIN_MASK_LENGTH) return "••••••••";
	return `••••••••${key.slice(-MIN_MASK_LENGTH)}`;
}

// oxlint-disable-next-line max-lines-per-function
function RouteComponent() {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const navigate = useNavigate();
	const { data: settings, isPending } = useQuery(
		convexQuery(api.user_settings.getUserSettings, {}),
	);

	const upsertFn = useConvexMutation(api.user_settings.upsertUserSettings);

	const mutation = useMutation({
		mutationFn: (values: { apiKey: string }) => upsertFn(values),
	});

	const form = useForm({
		defaultValues: { apiKey: "" },
		onSubmit: async ({ value, formApi }) => {
			await mutation.mutateAsync({ apiKey: value.apiKey.trim() });
			formApi.reset();
		},
	});

	useEffect(() => {
		if (!isLoading && !isAuthenticated) navigate({ to: "/login" });
	}, [isAuthenticated, isLoading, navigate]);

	if (!isAuthenticated) return;

	return (
		<div className="max-w-lg">
			<h1 className="text-2xl font-semibold text-gray-900 mb-1">Settings</h1>
			<p className="text-sm text-gray-500 mb-8">Manage your API key.</p>

			<section className="bg-white border border-gray-200 rounded-lg p-5">
				<h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
					API Key
				</h2>

				{isPending ? (
					<p className="text-sm text-gray-400">Loading…</p>
				) : (
					<div className="mb-4">
						<p className="text-xs text-gray-500 mb-1">Current key</p>
						<code className="text-sm font-mono bg-gray-50 border border-gray-200 rounded px-3 py-2 block">
							{settings?.apiKey ? (
								maskApiKey(settings.apiKey)
							) : (
								<span className="text-gray-400 italic">Not set</span>
							)}
						</code>
					</div>
				)}

				<form
					onSubmit={(event) => {
						event.preventDefault();
						form.handleSubmit();
					}}
					className="flex flex-col gap-3"
				>
					<form.Field
						name="apiKey"
						validators={{
							onBlur: ({ value }) => {
								const result = userSettingsSchema.shape.apiKey.safeParse(value.trim());
								// oxlint-disable-next-line no-undefined
								return result.success ? undefined : result.error.issues[0]?.message;
							},
						}}
					>
						{(field) => (
							<div>
								<label
									htmlFor={field.name}
									className="block text-xs font-medium text-gray-700 mb-1"
								>
									New API key
								</label>
								<input
									id={field.name}
									type="text"
									value={field.state.value}
									onChange={(event) => field.handleChange(event.target.value)}
									onBlur={field.handleBlur}
									placeholder="Paste your API key here"
									className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400 font-mono"
									autoComplete="off"
									spellCheck={false}
								/>
								{field.state.meta.errors.length > 0 && (
									<p className="text-xs text-red-600 mt-1">{field.state.meta.errors[0]}</p>
								)}
							</div>
						)}
					</form.Field>

					{mutation.isError && (
						<p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
							{mutation.error instanceof Error ? mutation.error.message : "Failed to save"}
						</p>
					)}
					{mutation.isSuccess && (
						<p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
							API key saved.
						</p>
					)}

					<form.Subscribe selector={(selector) => [selector.values.apiKey, selector.isSubmitting]}>
						{([apiKey, isSubmitting]) => (
							<button
								type="submit"
								disabled={(isSubmitting as boolean) || !(apiKey as string).trim()}
								className="self-start px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
							>
								{isSubmitting ? "Saving…" : "Save"}
							</button>
						)}
					</form.Subscribe>
				</form>
			</section>
		</div>
	);
}
