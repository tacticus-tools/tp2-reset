import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";

import { query } from "./_generated/server";

const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [Password, Anonymous],
});

const loggedInUser = query({
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return;

		return await ctx.db.get("users", userId);
	},
});

export { auth, signIn, signOut, store, isAuthenticated, loggedInUser };
