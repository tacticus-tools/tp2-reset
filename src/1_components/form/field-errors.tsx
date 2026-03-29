import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ZodError } from "zod";

import { FieldError } from "#src/1_components/ui/field";

interface FieldErrorsProps {
	meta: AnyFieldMeta;
}

export const FieldErrors = ({ meta }: FieldErrorsProps) =>
	meta.isTouched && <FieldError errors={meta.errors as ZodError[]} />;
