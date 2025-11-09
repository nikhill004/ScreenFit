export interface Task {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  isOverdue?: boolean;
}

const TASKS_KEY = 'digital-wellness-tasks';

export const taskStorage = {
  getTasks: (): Task[] => {
    try {
      const tasks = localStorage.getItem(TASKS_KEY);
      return tasks ? JSON.parse(tasks) : [];
    } catch {
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'isOverdue'>): Task => {
    const tasks = taskStorage.getTasks();
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isOverdue: new Date(task.deadline) < new Date()
    };
    tasks.push(newTask);
    taskStorage.saveTasks(tasks);
    return newTask;
  },

  checkOverdue: (): void => {
    const tasks = taskStorage.getTasks();
    const now = new Date();
    tasks.forEach(task => {
      if (!task.completed) {
        task.isOverdue = new Date(task.deadline) < now;
      }
    });
    taskStorage.saveTasks(tasks);
  },

  updateTask: (id: string, updates: Partial<Task>): void => {
    const tasks = taskStorage.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates };
      taskStorage.saveTasks(tasks);
    }
  },

  deleteTask: (id: string): void => {
    const tasks = taskStorage.getTasks().filter(t => t.id !== id);
    taskStorage.saveTasks(tasks);
  },

  toggleComplete: (id: string): void => {
    const tasks = taskStorage.getTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date().toISOString() : undefined;
      taskStorage.saveTasks(tasks);
    }
  }
};
