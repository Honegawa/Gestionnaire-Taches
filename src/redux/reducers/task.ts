import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../interfaces/task";

type initialTask = {
  data: Task[];
  loading: boolean | null;
  error: boolean;
};

const initialState: initialTask = {
  data: [],
  loading: null,
  error: false,
};

export const Tasks = createSlice({
  name: "Tasks",
  initialState,

  reducers: {
    FETCH_START: (store: initialTask) => {
      store.loading = true;
    },
    FETCH_SUCCESS: (
      store: initialTask,
      actions: PayloadAction<Task[]>
    ) => {
      store.loading = false;
      store.data = actions.payload;
    },
    FETCH_FAILURE: (store: initialTask) => {
      store.loading = false;
      store.error = true;
    },
    // POST_START: (store: initialTask) => {
    //   store.loading = true;
    // },
    // POST_SUCCESS: (
    //   store: initialTask,
    //   actions: PayloadAction<Task>
    // ) => {
    //   store.loading = false;
    //   store.data.push(actions.payload);
    // },
    // POST_FAILURE: (store: initialTask) => {
    //   store.loading = false;
    //   store.error = true;
    // },
  },
});

export const { 
    FETCH_START, 
    FETCH_SUCCESS, 
    FETCH_FAILURE, 
    // POST_START,
    // POST_SUCCESS, 
    // POST_FAILURE 
} = Tasks.actions;

export default Tasks.reducer;
