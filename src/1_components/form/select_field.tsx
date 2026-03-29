import { Label } from "#src/1_components/ui/label.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#src/1_components/ui/select.tsx";

import { FieldErrors } from "./field_errors.tsx";
import { useFieldContext } from "./form_context.ts";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectFieldProps {
	label: string;
	options: SelectOption[];
	placeholder?: string;
}

export const SelectField = ({ label, options, placeholder }: SelectFieldProps) => {
	const field = useFieldContext<string | null>();

	return (
		<div className="space-y-2">
			<div className="space-y-1">
				<Label htmlFor={field.name}>{label}</Label>
				<Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
					<SelectTrigger id={field.name} onBlur={field.handleBlur}>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<FieldErrors meta={field.state.meta} />
		</div>
	);
};
