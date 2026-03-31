import { useConvexMutation, convexQuery } from "@convex-dev/react-query";
import { usePostHog } from "@posthog/react";
import { useForm } from "@tanstack/react-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { UserSettingsSchema } from "#common/schemas";

import { api } from "#convex/_generated/api";

export const Route = createFileRoute("/_authenticated/settings")({
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
	const posthog = usePostHog();
	const { data: settings, isPending } = useQuery(convexQuery(api.user_settings.getUserSettings));

	const mutation = useMutation({
		mutationFn: useConvexMutation(api.user_settings.upsertUserSettings),
		onSuccess: () => posthog.capture("upsertUserSettings success"),
		onError: (error) => posthog.capture("upsertUserSettings error", { error: error.message }),
	});

	const form = useForm({
		defaultValues: { apiKey: "" },
		onSubmit: async ({ value, formApi }) => {
			await mutation.mutateAsync({ apiKey: value.apiKey.trim() });
			formApi.reset();
		},
	});

	return (
		<div className="max-w-lg">
			<h1 className="mb-1 text-2xl font-semibold text-gray-100">Settings</h1>
			<p className="mb-8 text-sm text-gray-500">Manage your API key.</p>

			<section className="rounded-lg border border-gray-800 bg-gray-800 p-5">
				<h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-200 uppercase">
					API Key
				</h2>

				{isPending ? (
					<p className="text-sm text-gray-400">Loading…</p>
				) : (
					<div className="mb-4">
						<p className="mb-1 text-xs text-gray-300">Current key</p>
						<code className="block rounded-sm border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm text-black">
							{settings?.apiKey ? (
								maskApiKey(settings.apiKey)
							) : (
								<span className="text-gray-300 italic">Not set</span>
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
								const result = UserSettingsSchema.shape.apiKey.safeParse(value.trim());
								// oxlint-disable-next-line no-undefined
								return result.success ? undefined : result.error.issues[0]?.message;
							},
						}}
					>
						{(field) => (
							<div>
								<label
									htmlFor={field.name}
									className="mb-1 block text-xs font-medium text-gray-700"
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
									className="w-full rounded-sm border border-gray-200 px-3 py-2 font-mono text-sm focus:border-gray-400 focus:outline-none"
									autoComplete="off"
									spellCheck={false}
								/>
								{field.state.meta.errors.length > 0 && (
									<p className="mt-1 text-xs text-red-600">{field.state.meta.errors[0]}</p>
								)}
							</div>
						)}
					</form.Field>

					{mutation.isError && (
						<p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
							{mutation.error instanceof Error ? mutation.error.message : "Failed to save"}
						</p>
					)}
					{mutation.isSuccess && (
						<p className="rounded-sm border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
							API key saved.
						</p>
					)}

					<form.Subscribe selector={(selector) => [selector.values.apiKey, selector.isSubmitting]}>
						{([apiKey, isSubmitting]) => (
							<button
								type="submit"
								disabled={(isSubmitting as boolean) || !(apiKey as string).trim()}
								className="self-start rounded-sm bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
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
