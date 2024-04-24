import { createSelector } from "@reduxjs/toolkit";
import { RootState, Task, TaskFilters } from "../../interfaces/task";

export const allTasks = (state: RootState) => {
  return state.tasks.data;
};

export const filteredTasks = createSelector(
  (state: RootState) => state.tasks.data,
  (state: RootState) => state.tasks.filters,
  (data, filters) => {
    return data
      .filter((task: Task) => task.title.toLowerCase().includes(filters.title.toLowerCase()))
      .filter((task: Task) =>
        task.content.toLowerCase().includes(filters.content.toLowerCase())
      )
      .filter((task: Task) =>
        filters.priority === 0 ? true : task.priority === filters.priority
      )
      .filter((task: Task) =>
        task.category.name.toLowerCase().includes(filters.category.toLowerCase())
      )
      .filter((task: Task) =>
        filters.done === "all" ? true : task.done.toString() === filters.done 
      );
  }
);

export const filteredTasks2 = (state: RootState, filters: TaskFilters) => {
  const initialState = state;
  const tasks = allTasks(initialState);
  const filteredTasksByTitle = filterTasksByTitle(tasks, filters.title);
  const filteredTasksByContent = filterTasksByContent(
    filteredTasksByTitle,
    filters.content
  );
  const filteredTasksByPriority = filterTasksByPriority(
    filteredTasksByContent,
    filters.title
  );
  const filteredTasksByCategory = filterTasksByCategory(
    filteredTasksByPriority,
    filters.category
  );
  return filteredTasksByCategory;
};

const filterTasksByTitle = (state: Task[], search: string) => {
  const regex = new RegExp(search);
  return state.filter((task: Task) => task.title.match(regex));
};

const filterTasksByContent = (state: Task[], search: string) => {
  const regex = new RegExp(search);
  return state.filter((task: Task) => task.content.match(regex));
};

const filterTasksByPriority = (state: Task[], search: string) => {
  const priority = Number(search);
  if (priority !== 0) {
    return state.filter((task: Task) => task.priority === priority);
  }
  return state;
};

const filterTasksByCategory = (state: Task[], search: string) => {
  const regex = new RegExp(search);
  return state.filter((task: Task) => task.category.name.match(regex));
};
