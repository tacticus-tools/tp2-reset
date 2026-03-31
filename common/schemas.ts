import { z } from "zod";

export const userSettingsSchema = z.object({
	apiKey: z.string().min(1, "API key cannot be empty"),
});
