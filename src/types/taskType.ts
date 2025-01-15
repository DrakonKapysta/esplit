export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}
export enum TaskPosition {
  After = "After",
  Before = "Before",
}

export interface TaskType {
  id: string;
  description: string;
  priority: Priority;
}

export interface SectionType {
  id: string;
  title: string;
  className: string;
  titleStyles: string;
  tasks: TaskType[];
}
