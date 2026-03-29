import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { userSettingsSchema } from "#common/schemas";

import { mutation, query } from "./_generated/server";

const getUserSettings = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error("Not authenticated");

		return await ctx.db
			.query("userSettings")
			.withIndex("by_userId", (q) => q.eq("userId", userId))
			.unique();
	},
});

const upsertUserSettings = mutation({
	args: {
		apiKey: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new Error("Not authenticated");

		// Validate against Zod schema
		const parsed = userSettingsSchema.safeParse({ apiKey: args.apiKey });
		if (!parsed.success) {
			const { issues } = parsed.error;
			throw new Error(issues[0]?.message ?? "Invalid input");
		}

		const existing = await ctx.db
			.query("userSettings")
			.withIndex("by_userId", (q) => q.eq("userId", userId))
			.unique();

		// oxlint-disable-next-line unicorn/prefer-ternary
		if (existing) await ctx.db.patch(existing._id, { apiKey: parsed.data.apiKey });
		else await ctx.db.insert("userSettings", { userId, apiKey: parsed.data.apiKey });
	},
});

export { getUserSettings, upsertUserSettings };
