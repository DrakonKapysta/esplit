import { useDashboardStore } from "@/store/DashboardStore";
import { TaskType } from "@/types/taskType";
import { useCallback, useEffect, useRef, useState } from "react";

export function useDragging(
  task: TaskType,
  cardId: string,
  onDrop?: (
    taskIdFrom: string,
    cardIdFrom: string,
    taskIdTo: string,
    cardIdTo: string
  ) => void
) {
  const [isDragging, setIsDragging] = useState(false);
  const isDragEnded = useRef(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const dragElementRef = useRef<HTMLDivElement | null>(null);
  const addTaskToSection = useDashboardStore((state) => state.addTaskToSection);
  const setDraggingOverId = useDashboardStore(
    (state) => state.setDraggingOverId
  );
  const removeTaskFromSection = useDashboardStore(
    (state) => state.removeTaskFromSection
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      animationFrameRef.current = requestAnimationFrame(() => {
        setDragPosition({ x: e.clientX, y: e.clientY });
        const elementUnderCursor = document.elementFromPoint(
          e.clientX,
          e.clientY
        );
        if (elementUnderCursor) {
          const closestCard = elementUnderCursor.closest("[data-card-id]");
          setDraggingOverId(closestCard?.getAttribute("data-card-id") || null);
        }
        if (isDragEnded.current) {
          setDraggingOverId(null);
          isDragEnded.current = false;
        }
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      setIsDragging(false);

      setDraggingOverId(null);

      isDragEnded.current = true;

      const elementUnderCursor = document.elementFromPoint(
        e.clientX,
        e.clientY
      );
      if (elementUnderCursor) {
        const closestCard = elementUnderCursor.closest("[data-task-id]");
        if (closestCard) {
          if (onDrop && dragElementRef.current)
            onDrop(
              task.id || "",
              cardId || "",
              closestCard.getAttribute("data-task-id") || "",
              closestCard.getAttribute("data-card-id") || ""
            );
        } else {
          const closestSection = elementUnderCursor.closest("[data-card-id]");
          if (closestSection) {
            removeTaskFromSection(task.id, cardId);

            addTaskToSection(
              task,
              closestSection.getAttribute("data-card-id") || ""
            );
          }
        }
      } else {
        console.warn("No element under cursor");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragPosition({ x: e.clientX, y: e.clientY });
  }, []);
  return { isDragging, dragPosition, dragElementRef, handleMouseDown };
}
