import type { ComponentProps } from "react";

import { cn } from "#src/4-lib/shadcn/utils.ts";

function Label({ className, ...props }: ComponentProps<"label">) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: I'm trusting Shadcn on this one
		<label
			data-slot="label"
			className={cn(
				"flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
