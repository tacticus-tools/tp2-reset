import { createFormHook } from "@tanstack/react-form";

import { CheckboxField } from "./checkbox-field.tsx";
import { fieldContext, formContext } from "./form-context.ts";
import { SelectField } from "./select-field.tsx";
import { SubmitButton } from "./submit-button.tsx";
import { TextField } from "./text-field.tsx";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		CheckboxField,
		SelectField,
		TextField,
	},
	fieldContext,
	formComponents: {
		SubmitButton,
	},
	formContext,
});
