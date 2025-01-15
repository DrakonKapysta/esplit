import { SidebarLink } from "@/components/shared/SidebarLink";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Plus, User, Kanban } from "lucide-react";

export const Route = createRootRoute({
  component: () => <RootComponent />,
});

const routeConstants = [
  {
    id: "home",
    path: "/",
    icon: <Kanban size={22} />,
    text: "Dashboard",
  },
  {
    id: "add-task",
    path: "/add-task",
    icon: <Plus size={22} />,
    text: "Add Task",
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
        <aside className="flex flex-col p-4 max-w-40 flex-1 gap-4">
          <h2 className="text-2xl mb-4 text-teal-500">Esplit</h2>
          {routeConstants.map((route) => (
            <SidebarLink key={route.id} {...route} />
          ))}
        </aside>
        <div className="flex flex-col border flex-1 bg-secondary rounded-md">
          <Outlet />
        </div>
      </div>
      <footer>Footer</footer>
      <TanStackRouterDevtools />
    </main>
  );
}
