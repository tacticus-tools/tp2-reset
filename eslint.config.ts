import convexPlugin from "@convex-dev/eslint-plugin";
import queryPlugin from "@tanstack/eslint-plugin-query";
import routerPlugin from "@tanstack/eslint-plugin-router";
import tailwindPlugin from "eslint-plugin-better-tailwindcss";
import jestDomPlugin from "eslint-plugin-jest-dom";
import oxlint from "eslint-plugin-oxlint";
import rtlPlugin from "eslint-plugin-testing-library";
// @ts-check
import { defineConfig, globalIgnores } from "eslint/config";
import tsPlugin from "typescript-eslint";

// General Notes:
// - We use Oxlint as our primary linter. ESLint is only used for plugins that Oxlint doesn't support.
// - oxlint.buildFromOxlintConfigFile reads .oxlintrc.json and disables all ESLint rules that Oxlint
//   Already covers, preventing double-reporting. It must be spread last in the config array.
// - The Convex Plugin version we have installed (1.1.1) is broken on ESLint 10.0.0. Don't upgrade ESLint until Convex releases a fix.

export default defineConfig([
	globalIgnores([
		"**/convex/_generated/**",
		"**/src/routeTree.gen.ts",
		"**/dist/**/*",
		"**/node_modules/**",
		"**/src/1_components/ui/**",
	]),
	{
		files: ["**/*.ts", "**/*.tsx"],
	},
	tsPlugin.configs.base, // Required by the Convex plugin; Oxlint handles base linting so we use the minimal TS-ESLint install
	...convexPlugin.configs.recommended,
	...queryPlugin.configs["flat/recommended"],
	...routerPlugin.configs["flat/recommended"],
	jestDomPlugin.configs["flat/recommended"],
	{
		...tailwindPlugin.configs.recommended,
		files: ["**/*.ts", "**/*.tsx"],
		ignores: ["**/__root.tsx"],
		settings: {
			"better-tailwindcss": {
				entryPoint: "src/styles.css",
				rootFontSize: 16,
			},
		},
		rules: {
			...tailwindPlugin.configs.recommended.rules,
			"better-tailwindcss/enforce-canonical-classes": "error",
			"better-tailwindcss/enforce-consistent-line-wrapping": "off",
		},
	},
	{
		...rtlPlugin.configs["flat/react"],
		files: ["**/*.spec.ts", "**/*.spec.tsx", "**/*.test.ts", "**/*.test.tsx"],
	},
	// Disable ESLint rules already covered by Oxlint to prevent double-reporting.
	// Derived directly from .oxlintrc.json so it stays in sync with our oxlint config.
	// Must be last.
	...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
]);
