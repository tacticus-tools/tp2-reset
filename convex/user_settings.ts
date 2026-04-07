import { UserSettingsSchema } from "#common/schemas";

import { zMutation, zQuery } from "./_utils";

const getUserSettings = zQuery({
	args: {},
	returns: UserSettingsSchema.omit({ clerkUserId: true }),
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");
		const { subject } = identity;

		const dbData = await ctx.db
			.query("userSettings")
			.withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", subject))
			.unique();
		return UserSettingsSchema.omit({ clerkUserId: true }).parse(dbData);
	},
});

const upsertUserSettings = zMutation({
	args: UserSettingsSchema.omit({ clerkUserId: true }).partial(),
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");
		const { subject } = identity;

		const existing = await ctx.db
			.query("userSettings")
			.withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", subject))
			.unique();

		// oxlint-disable-next-line unicorn/prefer-ternary
		if (existing) await ctx.db.patch(existing._id, args);
		else await ctx.db.insert("userSettings", { ...args, clerkUserId: subject });
	},
});

export { getUserSettings, upsertUserSettings };
