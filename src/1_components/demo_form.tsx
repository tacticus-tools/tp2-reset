import type { CSSProperties } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { useAppForm } from "#src/1_components/form";

const formSchema = z.object({
	email: z.email("Invalid email address"),
	isHuman: z.literal(true),
	userName: z.string().min(2, "First name must be at least 2 characters"),
});

export function DemoForm() {
	const form = useAppForm({
		defaultValues: {
			email: "",
			isHuman: false,
			userName: "",
		},
		onSubmit: ({ value }) => {
			toast("You submitted the following values:", {
				classNames: {
					content: "flex flex-col gap-2",
				},
				description: (
					<pre className="mt-2 w-80 overflow-x-auto rounded-md p-4">
						<code>{JSON.stringify(value)}</code>
					</pre>
				),
				position: "bottom-right",
				style: {
					"--border-radius": "calc(var(--radius)  + 4px)",
				} as CSSProperties,
			});
		},
		validators: {
			onChange: formSchema,
		},
	});

	return (
		<form.AppForm>
			<form.AppField
				name="userName"
				children={(field) => <field.TextField labelOverride="User Name" />}
			/>
			<form.AppField name="email" children={(field) => <field.TextField labelOverride="Email" />} />
			<form.AppField
				name="isHuman"
				children={(field) => <field.CheckboxField labelOverride="I am a human" />}
			/>
			<form.SubmitButton />
		</form.AppForm>
	);
}
