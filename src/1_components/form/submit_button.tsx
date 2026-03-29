import { useStore } from "@tanstack/react-form";

import { Button } from "#src/1_components/ui/button.tsx";

import { useFormContext } from "./form_context.ts";

interface SubmitButtonProps {
	idleText?: string;
	submittingText?: string;
}

export const SubmitButton = ({
	idleText = "Save",
	submittingText = "Saving",
}: SubmitButtonProps) => {
	const form = useFormContext();

	const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
		state.isSubmitting,
		state.canSubmit,
	]);

	return (
		<Button type="submit" disabled={isSubmitting || !canSubmit} onClick={form.handleSubmit}>
			{isSubmitting ? submittingText : idleText}
		</Button>
	);
};
