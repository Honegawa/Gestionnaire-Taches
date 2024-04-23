import { Category } from "./category";

export interface Task {
  id: number;
  title: string;
  content: string;
  priority: number;
  category: Category;
  done: boolean;
  expiration: string;
}

export interface TaskFormData {
  id?: number;
  title?: string;
  content?: string;
  priority?: number;
  category?: Category;
  done?: boolean;
  expiration?: string;
}