import { DashboardTaskForm } from "@/components/shared/DashboardTaskForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/add-task/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-4 flex flex-col justify-center items-center border flex-1">
      <DashboardTaskForm />
    </div>
  );
}
