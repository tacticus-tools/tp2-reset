import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ZodError } from "zod";

import { FieldError } from "../ui/field.tsx";

type FieldErrorsProps = {
	meta: AnyFieldMeta;
};

export const FieldErrors = ({ meta }: FieldErrorsProps) => {
	return meta.isTouched && <FieldError errors={meta.errors as ZodError[]} />;
};
