export type TaskPriority = "high" | "medium" | "low"; // this will add our priority to change colors etc
export type TaskCategory = "Work" | "Personal" | "Health"; // again, but this time for categories.

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
  category: TaskCategory;
  createdAt: Date;
}
