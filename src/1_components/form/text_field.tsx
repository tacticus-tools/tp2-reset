import { Field, FieldDescription, FieldLabel } from "#src/1_components/ui/field.tsx";
import { Input } from "#src/1_components/ui/input.tsx";

import { FieldErrors } from "./field_errors.tsx";
import { useFieldContext } from "./form_context.ts";

export function TextField({
	labelOverride,
	placeholderOverride,
	description,
}: {
	labelOverride?: string;
	placeholderOverride?: string;
	description?: string;
}) {
	const field = useFieldContext<string>();

	return (
		<Field>
			<FieldLabel htmlFor={field.name}>{labelOverride ?? field.name}</FieldLabel>
			<Input
				id={field.name}
				autoComplete="off"
				value={field.state.value}
				type="text"
				placeholder={placeholderOverride ?? labelOverride ?? field.name}
				onBlur={field.handleBlur}
				onChange={(event) => field.handleChange(event.target.value)}
			/>
			<FieldDescription>{description}</FieldDescription>
			<FieldErrors meta={field.state.meta} />
		</Field>
	);
}
