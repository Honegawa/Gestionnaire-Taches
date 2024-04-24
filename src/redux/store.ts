import { configureStore } from "@reduxjs/toolkit";

import Categories from "./reducers/category";
import Task from "./reducers/task"

export default configureStore({
  reducer: {
    categories: Categories,
    tasks: Task
  },
});
