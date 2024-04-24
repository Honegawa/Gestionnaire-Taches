import { Category } from "./category";

export interface Task {
  id: number;
  title: string;
  content: string;
  priority: number;
  category: Category;
  done: boolean;
  expiration: string;
  categoryId: number;
}

export interface TaskFormData {
  id?: number;
  title?: string;
  content?: string;
  priority?: number;
  category?: Category;
  done?: boolean;
  expiration?: string;
  categoryId?: number;
}

export type UpdatedTask = {
  data: Task[];
  update: Task;
};

export type DeletedTask = {
  data: Task[];
  id: number;
}

export type TaskFilters = {
  title: string;
  content: string;
  priority: number;
  category: string;
  done: string;
}

export type RootState = {
  tasks: {
    data: Task[];
    filters: TaskFilters;
  };
};
