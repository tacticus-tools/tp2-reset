import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const applicationTables = {
	userSettings: defineTable({
		userId: v.string(),
		apiKey: v.string(),
	}).index("by_userId", ["userId"]),
};

export default defineSchema({
	...authTables,
	...applicationTables,
});
