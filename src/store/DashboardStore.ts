import {
  Priority,
  SectionType,
  TaskPosition,
  TaskType,
  TaskTypeWithSection,
} from "@/types/taskType";
import { create } from "zustand";

interface DashboardStoreState {
  sections: SectionType[];
  draggingTaskId: string | null;
  fromSectionId: string | null;
  isDragging: boolean;
  draggingOverId: string | null;
  addTaskToSection: (task: TaskType, sectionId: string) => void;
  addTaskOnPosition: (
    task: TaskType,
    sectionId: string,
    position: TaskPosition,
    taskId?: string
  ) => void;
  removeTaskFromSection: (taskId: string, sectionId: string) => TaskType | null;
  setDraggingTaskId: (taskId: string) => void;
  setFromSectionId: (sectionId: string) => void;
  setIsDragging: (isDragIntoSection: boolean) => void;
  setDraggingOverId: (sectionId: string | null) => void;
  updateTask: (updatedTask: TaskTypeWithSection) => void;
  deleteTask: (taskId: string, sectionId: string) => void;
}

const initialState = {
  draggingTaskId: null,
  fromSectionId: null,
  isDragging: false,
  draggingOverId: null,
  sections: [
    {
      id: "backlog-123123",
      title: "Backlog",
      className: "shadow-slate-300 border-slate-300",
      titleStyles: "border-slate-300 font-bold text-slate-500",
      tasks: [
        {
          description:
            "Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1Task 1v",
          id: "123",
          priority: Priority.Low,
        },
        { description: "Task 12", id: "2223", priority: Priority.Low },
        { description: "Task 11", id: "523", priority: Priority.Low },
        { description: "Task 10", id: "623", priority: Priority.Low },
        { description: "Task 13", id: "923", priority: Priority.Low },
        { description: "Task 14", id: "1239", priority: Priority.Low },
        { description: "Task 15", id: "1238", priority: Priority.Low },
        { description: "Task 16", id: "19923", priority: Priority.Low },
        { description: "Task 17", id: "129763", priority: Priority.Low },
        { description: "Task 19", id: "1223113", priority: Priority.Low },
      ],
    },
    {
      id: "progress-43224",
      title: "In Progress",
      className: "shadow-slate-300 border-slate-300",
      titleStyles: "border-slate-300 font-bold text-slate-500",
      tasks: [{ description: "Task 2", id: "425", priority: Priority.Medium }],
    },
    {
      id: "rewiew-213321",
      title: "Rewiew",
      className: "shadow-slate-300 border-slate-300",
      titleStyles: "border-slate-300 font-bold text-slate-500",
      tasks: [{ description: "Task 3", id: "832", priority: Priority.Medium }],
    },
    {
      id: "done-76223",
      title: "Done",
      className: "shadow-slate-300 border-slate-300",
      titleStyles: "border-slate-300 font-bold text-slate-500",
      tasks: [{ description: "Task 4", id: "1653", priority: Priority.High }],
    },
  ],
};

export const useDashboardStore = create<DashboardStoreState>()((set) => ({
  ...initialState,
  addTaskToSection: (task, sectionId) => {
    set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: [...section.tasks, task],
          };
        }
        return section;
      }),
    }));
  },
  removeTaskFromSection: (taskId, sectionId) => {
    let removedTask = null;
    set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id === sectionId) {
          removedTask = section.tasks.find((task) => task.id === taskId);
          return {
            ...section,
            tasks: section.tasks.filter((task) => task.id !== taskId),
          };
        }
        return section;
      }),
    }));
    return removedTask;
  },
  setDraggingTaskId: (taskId: string | null) => {
    set(() => ({
      draggingTaskId: taskId,
    }));
  },
  setFromSectionId: (sectionId: string | null) => {
    set(() => ({
      fromSectionId: sectionId,
    }));
  },
  setIsDragging: (isDragging: boolean) => {
    set(() => {
      return {
        isDragging: isDragging,
      };
    });
  },
  setDraggingOverId: (sectionId: string | null) => {
    set(() => ({
      draggingOverId: sectionId,
    }));
  },
  addTaskOnPosition: (task, sectionId, position: TaskPosition, taskId) => {
    set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id === sectionId) {
          const startIndex = section.tasks.findIndex(
            (task) => task.id === taskId
          );
          const index =
            position === TaskPosition.After ? startIndex + 1 : startIndex;
          return {
            ...section,
            tasks: [
              ...section.tasks.slice(0, index),
              task,
              ...section.tasks.slice(index),
            ],
          };
        } else {
          return section;
        }
      }),
    }));
  },
  updateTask: ({ sectionId, ...upatedTask }: TaskTypeWithSection) => {
    return set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task) => {
              if (task.id === upatedTask.id) {
                return upatedTask;
              }
              return task;
            }),
          };
        }
        return section;
      }),
    }));
  },
  deleteTask: (taskId, sectionId) => {
    return set((state) => ({
      sections: state.sections.map((section) => {
        if (section.id == sectionId) {
          return {
            ...section,
            tasks: section.tasks.filter((task) => task.id !== taskId),
          };
        }
        return section;
      }),
    }));
  },
}));
