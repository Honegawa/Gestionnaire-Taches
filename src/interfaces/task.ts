import { Category } from "./category";

export interface Task {
  title: string;
  content: string;
  priority: number;
  category: Category;
  done: boolean;
  expiration: Date;
}
