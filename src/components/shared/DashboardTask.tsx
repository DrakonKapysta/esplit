import { useDragging } from "@/hooks/useDragging";
import { cn } from "@/lib/utils";
import {
  Priority,
  TaskPosition,
  TaskType,
  TaskTypeWithSection,
} from "@/types/taskType";
import React, { ComponentPropsWithoutRef, FC, useEffect } from "react";
import { Settings } from "lucide-react";
import { Modal } from "./Modal";
import { DashboardTaskForm, Form } from "./DashboardTaskForm";
import { useDashboardStore } from "@/store/DashboardStore";
import { Button } from "../ui/button";
interface DashboardTaskProps extends ComponentPropsWithoutRef<"div"> {
  task: TaskType;
  cardId: string;
  onTaskDrop: (
    taskIdFrom: string,
    cardIdFrom: string,
    taskIdTo: string,
    cardIdTo: string,
    position: TaskPosition
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
  const updateTask = useDashboardStore((state) => state.updateTask);
  const deleteTask = useDashboardStore((state) => state.deleteTask);

  const [dragWidth, setDragWidth] = React.useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { dragElementRef, handleMouseDown, isDragging, dragPosition } =
    useDragging(task, cardId, onTaskDrop);

  const taskElementRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (taskElementRef.current) {
      setDragWidth(taskElementRef.current.getBoundingClientRect().width);
    }
  }, []);
  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const onSubmit = (data: Form) => {
    if (data.id && data.sectionId) {
      updateTask(data as TaskTypeWithSection);
      handleModalClose();
    }
  };
  const onDelete = () => {
    deleteTask(task.id, cardId);
    handleModalClose();
  };

  return (
    <>
      <div
        data-task-id={task.id}
        data-card-id={cardId}
        ref={taskElementRef}
        onMouseDown={handleMouseDown}
        {...props}
        className={cn(
          "p-2 border rounded shadow hover:ring-1 hover:ring-offset-1",
          className,
          {
            hidden: isDragging,
            "select-none": isDragging,
          }
        )}
      >
        <p className="inline-block">{task.description}</p>
        <br />
        <div className="flex justify-between items-end">
          <span
            aria-label={`Task priority: ${task.priority}`}
            className={cn("text-sm", priorityStyle)}
          >
            {task.priority} priority
          </span>
          <button
            onClick={() => {
              handleModalOpen();
            }}
            className=" p-1"
          >
            <Settings color="gray" size={16} className="pointer-events-none" />
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <DashboardTaskForm
          update={true}
          formValues={{ ...task, sectionId: cardId }}
          onSubmit={onSubmit}
        />
        <Button
          onClick={onDelete}
          variant={"destructive"}
          className="mt-2 w-full"
        >
          Delete
        </Button>
      </Modal>
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
