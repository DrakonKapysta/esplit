import { Dashboard } from "@/components/shared/Dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="p-4 border rounded-md shadow flex-1 flex bg-secondary">
      <Dashboard />
    </div>
  );
}
