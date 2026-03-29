import { URL, fileURLToPath } from "node:url";

import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// TODO: Keep an eye out for a better resolution to the "module is not defined" errors
// This distinct Vite config is a workaround to let Vite pre-bundle the CJS dependencies
// That cause those errors, but it would be nice to have a single config for both development and testing.
// For some reason placing this config in the main vite.config.ts file and running tests with
// `vitest --config vite.config.ts` doesn't work, so we need to have a separate config file for testing.

export default defineConfig({
	plugins: [
		react(),
		babel({
			presets: [reactCompilerPreset()],
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("src", import.meta.url)),
		},
	},
	test: {
		environment: "jsdom",
		server: {
			// Let Vite pre-bundle CJS deps so that it doesn't blow up with "module is not defined" errors
			deps: {
				inline: [/tiny-warning/],
			},
		},
		setupFiles: ["./test_setup.tsx"],
	},
});
