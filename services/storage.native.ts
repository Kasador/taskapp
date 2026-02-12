import * as SQLite from "expo-sqlite";
export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: "Work" | "Personal" | "Health";
  createdAt: string;
  updatedAt: string;
}

class NativeStorageService {
  private db: SQLite.SQLiteDatabase | null = null;
  async init(): Promise<void> {
    try {
      const dbName = "cda_tasks_mobile.db";
      this.db = await SQLite.openDatabaseAsync(dbName);
      await this.createTables();
      console.log("SQLite database initialized successfully");
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }
  private async createTables(): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0,
        priority TEXT DEFAULT 'medium',
        category TEXT DEFAULT 'Work',
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );
    `);
    await this.db.execAsync(`
      CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
    `);
  }
  async getAllTasks(): Promise<Task[]> {
    if (!this.db) throw new Error("Database not initialized");
    const result = await this.db.getAllAsync(`
      SELECT * FROM tasks ORDER BY createdAt DESC
    `);
    return result.map((row: any) => ({
      ...row,
      completed: Boolean(row.completed),
    })) as Task[];
  }
  async createTask(task: Omit<Task, "id">): Promise<Task> {
    if (!this.db) throw new Error("Database not initialized");
    const now = new Date().toISOString();
    const taskWithTimestamps = {
      ...task,
      createdAt: now,
      updatedAt: now,
    };

    const result = await this.db.runAsync(
      `
      INSERT INTO tasks (title, description, completed, priority, category, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        taskWithTimestamps.title,
        taskWithTimestamps.description,
        taskWithTimestamps.completed ? 1 : 0,
        taskWithTimestamps.priority,
        taskWithTimestamps.category,
        taskWithTimestamps.createdAt,
        taskWithTimestamps.updatedAt,
      ],
    );

    return {
      ...taskWithTimestamps,
      id: result.lastInsertRowId,
    };
  }
  // Additional CRUD methods...
  async deleteTask(id: number): Promise<boolean> {
    // delete task
    if (!this.db) throw new Error("Database not initialized");

    await this.db.runAsync(`DELETE FROM tasks WHERE id = ?`, [id]);

    return true;
  }
  async updateTask(id: number, updates: Partial<Task>): Promise<Task | null> {
    // update task
    if (!this.db) throw new Error("Database not initialized");

    const existing = await this.db.getFirstAsync(
      `SELECT * FROM tasks WHERE id = ?`,
      [id],
    );

    if (!existing) return null;

    const update: Task = {
      ...(existing as any),
      completed: Boolean((existing as any).completed),
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };

    await this.db.runAsync(
      `
      UPDATE tasks
      SET title = ?, description = ?, completed = ?, priority = ?, category = ?, updatedAt = ?
      WHERE id = ?
      `,
      [
        update.title,
        update.description ?? "",
        update.completed ? 1 : 0,
        update.priority,
        update.category,
        update.updatedAt,
        id,
      ],
    );

    return update;
  }
}
export default new NativeStorageService();
