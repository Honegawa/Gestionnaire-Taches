import { createSelector } from "@reduxjs/toolkit";
import { RootState, Task } from "../../interfaces/task";

export const allTasks = (state: RootState) => {
  return state.tasks.data;
};

export const filteredTasks = createSelector(
  (state: RootState) => state.tasks.data,
  (state: RootState) => state.tasks.filters,
  (data, filters) => {
    return data
      .filter((task: Task) =>
        task.title.toLowerCase().includes(filters.title.toLowerCase())
      )
      .filter((task: Task) =>
        task.content.toLowerCase().includes(filters.content.toLowerCase())
      )
      .filter((task: Task) =>
        filters.priority === 0 ? true : task.priority === filters.priority
      )
      .filter((task: Task) =>
        task.category.name
          .toLowerCase()
          .includes(filters.category.toLowerCase())
      )
      .filter((task: Task) =>
        filters.done === "all" ? true : task.done.toString() === filters.done
      );
  }
);
