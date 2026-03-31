import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	userSettings: defineTable({
		tokenIdentifier: v.string(),
		apiKey: v.string(),
	}).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
