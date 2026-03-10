import { create } from "zustand";
import { persist } from "zustand/middleware";

const THEMES = ["dark", "light", "system"] as const;
type Theme = (typeof THEMES)[number];

interface UserPreferencesState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	sidebarOpen: boolean;
	setSidebarOpen: (state: boolean) => void;
}

function applyThemeToDOM(theme: Theme) {
	const root = window.document.documentElement;
	root.classList.remove("light", "dark");
	if (theme === "system") {
		const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
			.matches
			? "dark"
			: "light";
		root.classList.add(systemTheme);
	} else {
		root.classList.add(theme);
	}
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
	persist(
		(set) => ({
			theme: "system",
			setTheme: (theme) => {
				applyThemeToDOM(theme);
				set({ theme });
			},
			sidebarOpen: true,
			setSidebarOpen: (state) => set({ sidebarOpen: state }),
		}),
		{
			name: "user-preferences-storage",
			onRehydrateStorage: () => (state) => {
				if (state?.theme) applyThemeToDOM(state.theme);
			},
		},
	),
);
