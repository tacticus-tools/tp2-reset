import { LegacyDataSchema } from "#common/schemas.js";

import { zMutation, zQuery } from "./_utils";

const getLegacyData = zQuery({
	args: {},
	returns: LegacyDataSchema.omit({ clerkUserId: true }),
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");
		const { subject } = identity;

		const dbData = await ctx.db
			.query("legacyData")
			.withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", subject))
			.unique();
		return LegacyDataSchema.omit({ clerkUserId: true}).parse(dbData)
	},
});

const upsertLegacyData = zMutation({
	args: LegacyDataSchema.omit({ clerkUserId: true, role: true }).partial(),
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");
		const { subject } = identity;
		const existing = await ctx.db
			.query("legacyData")
			.withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", subject))
			.unique();
		const fixedValues = { clerkUserId: subject, role: existing?.role ?? "user" };

		// oxlint-disable-next-line unicorn/prefer-ternary
		if (existing) await ctx.db.patch(existing._id, { ...args, ...fixedValues });
		else await ctx.db.insert("legacyData", LegacyDataSchema.parse({ ...args, ...fixedValues }));
	},
});

export { getLegacyData, upsertLegacyData };
