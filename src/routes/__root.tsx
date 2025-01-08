import { SidebarLink } from "@/components/shared/SidebarLink";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { HomeIcon, User } from "lucide-react";

export const Route = createRootRoute({
  component: () => <RootComponent />,
});

const routeConstants = [
  {
    id: "home",
    path: "/",
    icon: <HomeIcon size={22} />,
    text: "Home",
  },
  {
    id: "profile",
    path: "/profile",
    icon: <User size={22} />,
    text: "Profile",
  },
];

function RootComponent() {
  return (
    <main className="min-h-screen flex flex-col ">
      <div className="flex gap-2 border flex-1">
        <aside className="flex flex-col p-4 max-w-40 w-full gap-4">
          <h2 className="text-2xl mb-4 text-teal-500">Esplit</h2>
          {routeConstants.map((route) => (
            <SidebarLink key={route.id} {...route} />
          ))}
        </aside>
        <Outlet />
      </div>
      <footer>Footer</footer>
      <TanStackRouterDevtools />
    </main>
  );
}
