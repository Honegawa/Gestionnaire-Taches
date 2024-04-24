import { configureStore } from "@reduxjs/toolkit";

import Categories from "./reducers/category";
import Tasks from "./reducers/task";

export default configureStore({
  reducer: {
    categories: Categories,
    tasks: Tasks,
  },
});
