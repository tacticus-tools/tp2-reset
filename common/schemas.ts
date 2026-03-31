import { z } from "zod";

const UserSettingsSchema = z.object({
	clerkUserId: z.string(),
	apiKey: z.uuid(),
});

const LegacyDataSchema = z.object({
	clerkUserId: z.string(),
	rejectedTeamsCount: z.int().nonnegative().default(0),
	pendingTeamsCount: z.int().nonnegative().default(0),
	tacticusApiKey: z.uuid().optional(),
	tacticusGuildApiKey: z.uuid().optional(),
	tacticusUserId: z.string().optional(),
	role: z.enum(['user', 'moderator', 'admin']).default('user'),
	username: z.string().min(1).optional(),
})

export { UserSettingsSchema, LegacyDataSchema }
