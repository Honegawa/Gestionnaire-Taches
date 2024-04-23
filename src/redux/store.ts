import { configureStore } from "@reduxjs/toolkit";

import Categories from "./reducers/category";

export default configureStore({
  reducer: {
    categories: Categories,
  },
});
