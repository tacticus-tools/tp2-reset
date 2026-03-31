import { UserSettingsSchema } from "#common/schemas";

import { zMutation, zQuery } from "./_utils";

const getUserSettings = zQuery({
	args: {},
	returns: UserSettingsSchema,
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");
		const { subject } = identity;

		const dbData = await ctx.db
			.query("userSettings")
			.withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", subject))
			.unique();
		return UserSettingsSchema.parse(dbData)
	},
});

const upsertUserSettings = zMutation({
	args: UserSettingsSchema,
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");
		const { subject } = identity;
		// Validate against Zod schema
		const parsed = UserSettingsSchema.safeParse({ apiKey: args.apiKey });
		if (!parsed.success) {
			const { issues } = parsed.error;
			throw new Error(issues[0]?.message ?? "Invalid input");
		}

		const existing = await ctx.db
			.query("userSettings")
			.withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", subject))
			.unique()

		// oxlint-disable-next-line unicorn/prefer-ternary
		if (existing) await ctx.db.patch(existing._id, { apiKey: parsed.data.apiKey });
		else await ctx.db.insert("userSettings", { clerkUserId: subject, apiKey: parsed.data.apiKey });
	},
});

export { getUserSettings, upsertUserSettings };
