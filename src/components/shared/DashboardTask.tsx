import { useDragging } from "@/hooks/useDragging";
import { cn } from "@/lib/utils";
import { Priority, TaskType } from "@/types/taskType";
import React, { ComponentPropsWithoutRef, FC, useEffect } from "react";

interface DashboardTaskProps extends ComponentPropsWithoutRef<"div"> {
  task: TaskType;
  cardId: string;
  onTaskDrop: (
    taskIdFrom: string,
    cardIdFrom: string,
    taskIdTo: string,
    cardIdTo: string
  ) => void;
}

const priorityStyles = {
  [Priority.Low]: "text-green-500",
  [Priority.Medium]: "text-yellow-500",
  [Priority.High]: "text-red-500",
};

export const DashboardTask: FC<DashboardTaskProps> = ({
  task,
  cardId,
  onTaskDrop,
  className,
  ...props
}) => {
  const priorityStyle = priorityStyles[task.priority] || "text-gray-500";

  const [dragWidth, setDragWidth] = React.useState<number | null>(null);
  const { dragElementRef, handleMouseDown, isDragging, dragPosition } =
    useDragging(task, cardId, onTaskDrop);

  const taskElementRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (taskElementRef.current) {
      setDragWidth(taskElementRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <>
      <div
        data-task-id={task.id}
        data-card-id={cardId}
        ref={taskElementRef}
        onMouseDown={handleMouseDown}
        {...props}
        className={cn("p-2 border rounded shadow", className, {
          hidden: isDragging,
          "select-none": isDragging,
        })}
      >
        <p>{task.description}</p>

        <span
          aria-label={`Task priority: ${task.priority}`}
          className={cn("text-sm", priorityStyle)}
        >
          {task.priority} priority
        </span>
      </div>
      {isDragging && (
        <div
          ref={dragElementRef}
          className={cn(
            "fixed pointer-events-none p-2 border rounded shadow z-50 bg-white"
          )}
          style={{
            top: dragPosition.y + 5,
            left: dragPosition.x + 5,
            transform: "translate(-50%, -50%)",
            width: dragWidth || "auto",
          }}
        >
          <p>{task.description}</p>
          <span
            aria-label={`Task priority: ${task.priority}`}
            className={cn("text-sm", priorityStyle)}
          >
            {task.priority} priority
          </span>
        </div>
      )}
    </>
  );
};
