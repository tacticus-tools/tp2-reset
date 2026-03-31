import { LegacyDataSchema, UserSettingsSchema } from "#common/schemas.js";
import { zodOutputToConvex } from "convex-helpers/server/zod4";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
	legacyData: defineTable(zodOutputToConvex(LegacyDataSchema)).index("by_clerkUserId", ["clerkUserId"]),
	userSettings: defineTable(zodOutputToConvex(UserSettingsSchema)).index("by_clerkUserId", ["clerkUserId"]),
});
