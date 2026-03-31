Welcome to your new TanStack Start app!

# Getting Started

To run this application:

```bash
bun install
bun run dev
```

# Building For Production

To build this application for production:

```bash
bun run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
bun run test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

## Setting up Clerk

- Set the `VITE_CLERK_PUBLISHABLE_KEY` in your `.env.local`.

## Setting up Convex

- Set the `VITE_CONVEX_URL` and `CONVEX_DEPLOYMENT` environment variables in your `.env.local`. (Or run `bunx --bun convex init` to set them automatically.)
- Run `bunx --bun convex dev` to start the Convex server.

## Shadcn

Add components using the latest version of [Shadcn](https://ui.shadcn.com/).

```bash
bun dlx shadcn@latest add button
```

## T3Env

- You can use T3Env to add type safety to your environment variables.
- Add Environment variables to the `src/env.mjs` file.
- Use the environment variables in your code.

### Usage

```ts
import { env } from "#/env";

console.log(env.VITE_APP_TITLE);
```

## Setting up PostHog

1. Create a PostHog account at [posthog.com](https://posthog.com)
2. Get your Project API Key from [Project Settings](https://app.posthog.com/project/settings)
3. Set `VITE_POSTHOG_KEY` in your `.env.local`

### Optional Configuration

- `VITE_POSTHOG_HOST` - Set this if you're using PostHog Cloud EU (`https://eu.i.posthog.com`) or self-hosting

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "My App" },
		],
	}),
	shellComponent: ({ children }) => (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<header>
					<nav>
						<Link to="/">Home</Link>
						<Link to="/about">About</Link>
					</nav>
				</header>
				{children}
				<Scripts />
			</body>
		</html>
	),
});
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).
