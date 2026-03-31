import { createFormHook } from "@tanstack/react-form";

import { CheckboxField } from "./checkbox_field.tsx";
import { fieldContext, formContext } from "./form_context.ts";
import { SelectField } from "./select_field.tsx";
import { SubmitButton } from "./submit_button.tsx";
import { TextField } from "./text_field.tsx";

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
