export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}
export enum TaskPosition {
  After = "After",
  Before = "Before",
}

export type OptionType = {
  value: Priority;
  label: string;
};

export interface TaskType {
  id: string;
  description: string;
  priority: Priority;
}
export interface TaskTypeWithSection extends TaskType {
  sectionId: string;
}

export interface SectionType {
  id: string;
  title: string;
  className: string;
  titleStyles: string;
  tasks: TaskType[];
}
