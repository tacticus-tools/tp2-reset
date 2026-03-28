import * as matchers from "@testing-library/jest-dom/matchers";
import type { ReactNode } from "react";
import { expect, vi } from "vitest";

expect.extend(matchers);

// Tanstack React Router uses some features that are not available in the testing environment, so we need to mock it.
vi.mock("@tanstack/react-router", () => ({
	Link: ({ children, to }: { children: ReactNode; to: string }) => <a href={to}>{children}</a>,
	createFileRoute: (_path: string) => (routeOptions: unknown) => ({
		options: routeOptions,
		useLoaderData: vi.fn(),
		useSearch: vi.fn(),
	}),
	useRouter: () => ({
		navigate: vi.fn(),
	}),
}));
