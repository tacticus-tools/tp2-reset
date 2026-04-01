import { LegacyDataSchema } from "#common/schemas.js";
import { zMutation, zQuery } from "./_utils";

const getLegacyData = zQuery({
	args: {},
	returns: LegacyDataSchema,
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");
		const { subject } = identity;

		const dbData = await ctx.db
			.query("legacyData")
			.withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", subject))
			.unique();
		return LegacyDataSchema.parse(dbData)
	},
});

const upsertLegacyData = zMutation({
	args: LegacyDataSchema,
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");
		const { subject } = identity;

		const existing = await ctx.db
			.query("legacyData")
			.withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", subject))
			.unique();

		// oxlint-disable-next-line unicorn/prefer-ternary
		if (existing) await ctx.db.patch(existing._id, args);
		else await ctx.db.insert("legacyData", { ...args, clerkUserId: subject });
	},
});

export { getLegacyData, upsertLegacyData };
