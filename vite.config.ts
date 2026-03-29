import { cloudflare } from "@cloudflare/vite-plugin";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
	plugins: [
		devtools(),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		// This is the plugin that enables path aliases
		tailwindcss(),
		tanstackStart({
			prerender: { enabled: true },
			router: { routesDirectory: "0_routes" },
			spa: { enabled: true },
		}),
		react(),
		babel({
			presets: [reactCompilerPreset()],
		}),
	],
	ssr: {
		/* @convex-dev/auth/react has a "use client" directive that the
		 * Cloudflare Workers SSR environment misinterprets as an RSC boundary,
		 *   producing a client-reference stub that never resolves and hangs the Worker.
		 * Bundling it inline skips that boundary processing.
		 */
		noExternal: ["@convex-dev/auth"],
	},
});

export default config;
