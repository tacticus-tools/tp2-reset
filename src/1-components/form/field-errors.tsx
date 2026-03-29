import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ZodError } from "zod";

import { FieldError } from "#src/1-components/ui/field.tsx";

interface FieldErrorsProps {
	meta: AnyFieldMeta;
}

export const FieldErrors = ({ meta }: FieldErrorsProps) =>
	meta.isTouched && <FieldError errors={meta.errors as ZodError[]} />;
