import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => <RootComponent />,
});

function RootComponent() {
  return (
    <main className="container mx-auto min-h-screen flex flex-col ">
      <header className="min-h-16 flex items-center gap-4">
        Header
        <div>
          <Link to="/">Home</Link>
        </div>
      </header>
      <Outlet />
      <footer>Footer</footer>
      <TanStackRouterDevtools />
    </main>
  );
}
