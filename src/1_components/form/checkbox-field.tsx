import { Checkbox } from "#src/1_components/ui/checkbox.tsx";
import { FieldDescription, FieldLabel } from "#src/1_components/ui/field.tsx";

import { FieldErrors } from "./field-errors.tsx";
import { useFieldContext } from "./form-context.ts";

interface CheckboxFieldProps {
	labelOverride: string;
	description?: string;
}

export const CheckboxField = ({ labelOverride, description }: CheckboxFieldProps) => {
	const field = useFieldContext<boolean>();

	return (
		<>
			<Checkbox
				id={field.name}
				checked={field.state.value}
				onCheckedChange={(checked) => {
					field.handleChange(checked === true);
				}}
				onBlur={field.handleBlur}
			/>
			<FieldLabel htmlFor={field.name}>{labelOverride ?? field.name}</FieldLabel>
			<FieldDescription>{description}</FieldDescription>
			<FieldErrors meta={field.state.meta} />
		</>
	);
};
