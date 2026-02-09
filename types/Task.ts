export type TaskPriority = "high" | "medium" | "low"; // this will add our priority to change colors etc

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: Date;
}
