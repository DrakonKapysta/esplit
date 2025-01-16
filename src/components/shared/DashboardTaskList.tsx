import { cn } from "@/lib/utils";
import { TaskPosition, TaskType } from "@/types/taskType";
import { ComponentPropsWithoutRef, FC } from "react";
import { DashboardTask } from "./DashboardTask";
import { useDashboardStore } from "@/store/DashboardStore";

interface DashboardTaskListProps extends ComponentPropsWithoutRef<"div"> {
  tasks: TaskType[];
  cardId: string;
}

export const DashboardTaskList: FC<DashboardTaskListProps> = ({
  tasks,
  cardId,
  className,
  ...props
}) => {
  const addTaskOnPosition = useDashboardStore(
    (state) => state.addTaskOnPosition
  );
  const removeTaskFromSection = useDashboardStore(
    (state) => state.removeTaskFromSection
  );

  return (
    <div
      data-card-id={cardId}
      {...props}
      className={cn(
        "flex flex-col p-2 rounded shadow flex-1 gap-2 overflow-y-scroll no-scrollbar ",
        className
      )}
    >
      {tasks.map((task) => (
        <DashboardTask
          key={task.id}
          task={task}
          cardId={cardId}
          onTaskDrop={(
            taskIdFrom: string,
            cardIdFrom: string,
            taskIdTo: string,
            cardIdTo: string,
            position: TaskPosition
          ) => {
            if (!taskIdFrom || !cardIdFrom) return;
            removeTaskFromSection(taskIdFrom, cardIdFrom);
            addTaskOnPosition(task, cardIdTo, position, taskIdTo);
          }}
        />
      ))}
    </div>
  );
};
