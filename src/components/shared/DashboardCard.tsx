import { cn } from "@/lib/utils";
import { TaskType } from "@/types/taskType";
import { ClassValue } from "clsx";
import React, { ComponentPropsWithoutRef, FC } from "react";
import { DashboardTaskList } from "./DashboardTaskList";
import { useDashboardStore } from "@/store/DashboardStore";

interface DashboardCardProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  id: string;
  titleStyles?: ClassValue;
  tasks: TaskType[];
}

export const DashboardCard: FC<DashboardCardProps> = ({
  title,
  id,
  titleStyles,
  tasks,
  className,
  ...props
}) => {
  const draggingOverId = useDashboardStore((state) => state.draggingOverId);

  return (
    <div
      className={cn("flex flex-col border rounded shadow flex-1", className, {
        "ring-4 ring-offset-2 ring-slate-400/30 ":
          draggingOverId && id === draggingOverId,
      })}
      {...props}
    >
      <h2 className={cn("p-2 border-b  mb-2", titleStyles)}>{title}</h2>
      <DashboardTaskList tasks={tasks} cardId={id} />
    </div>
  );
};
