import { zodOutputToConvex } from "convex-helpers/server/zod4";
import { defineSchema, defineTable } from "convex/server";

import { LegacyDataSchema, UserSettingsSchema } from "#common/schemas.js";

export default defineSchema({
	legacyData: defineTable(zodOutputToConvex(LegacyDataSchema)).index("by_clerkUserId", [
		"clerkUserId",
	]),
	userSettings: defineTable(zodOutputToConvex(UserSettingsSchema)).index("by_clerkUserId", [
		"clerkUserId",
	]),
});
