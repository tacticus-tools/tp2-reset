import { Field, FieldDescription, FieldLabel } from "#src/1-components/ui/field.tsx";
import { Input } from "#src/1-components/ui/input.tsx";

import { FieldErrors } from "./field-errors.tsx";
import { useFieldContext } from "./form-context.ts";

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
