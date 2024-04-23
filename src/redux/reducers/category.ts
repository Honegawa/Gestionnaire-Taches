import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../interfaces/category";

type initialCategory = {
  data: Category[];
  loading: boolean | null;
  error: boolean;
};

const initialState: initialCategory = {
  data: [],
  loading: null,
  error: false,
};

export const Categories = createSlice({
  name: "Categories",
  initialState,

  reducers: {
    FETCH_START: (store: initialCategory) => {
      store.loading = true;
    },
    FETCH_SUCCESS: (
      store: initialCategory,
      actions: PayloadAction<Category[]>
    ) => {
      store.loading = false;
      store.data = actions.payload;
    },
    FETCH_FAILURE: (store: initialCategory) => {
      store.loading = false;
      store.error = true;
    },
    POST_START: (store: initialCategory) => {
      store.loading = true;
    },
    POST_SUCCESS: (
      store: initialCategory,
      actions: PayloadAction<Category>
    ) => {
      store.loading = false;
      store.data.push(actions.payload);
    },
    POST_FAILURE: (store: initialCategory) => {
      store.loading = false;
      store.error = true;
    },
  },
});

export const { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE, POST_START, POST_SUCCESS, POST_FAILURE } = Categories.actions;

export default Categories.reducer;
