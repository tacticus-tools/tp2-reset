import { createFormHook } from "@tanstack/react-form";
import { Button } from "#src/1-components/ui/button.tsx";
import { Field } from "#src/1-components/ui/field";
import { Input } from "#src/1-components/ui/input.tsx";
import {
	fieldContext,
	formContext,
} from "../../1-components/form/form-context.ts";

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	formComponents: {
		Field,
		Button,
	},
	fieldComponents: {
		Input,
	},
});
