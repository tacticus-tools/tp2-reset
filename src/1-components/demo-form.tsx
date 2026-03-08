import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "#src/1-components/form";

const formSchema = z.object({
	userName: z.string().min(2, "First name must be at least 2 characters"),
	email: z.email("Invalid email address"),
	isHuman: z.literal(true),
});

export function DemoForm() {
	const form = useAppForm({
		defaultValues: {
			email: "",
			userName: "",
			isHuman: false,
		},
		validators: {
			onChange: formSchema,
		},
		onSubmit: async ({ value }) => {
			toast("You submitted the following values:", {
				description: (
					<pre className="mt-2 w-80 overflow-x-auto rounded-md p-4">
						<code>{JSON.stringify(value, null, 2)}</code>
					</pre>
				),
				position: "bottom-right",
				classNames: {
					content: "flex flex-col gap-2",
				},
				style: {
					"--border-radius": "calc(var(--radius)  + 4px)",
				} as React.CSSProperties,
			});
		},
	});

	return (
		<form.AppForm>
			<form.AppField
				name="userName"
				children={(field) => <field.TextField labelOverride="User Name" />}
			/>
			<form.AppField
				name="email"
				children={(field) => <field.TextField labelOverride="Email" />}
			/>
			<form.AppField
				name="isHuman"
				children={(field) => (
					<field.CheckboxField labelOverride="I am a human" />
				)}
			/>
			<form.SubmitButton />
		</form.AppForm>
	);
}
