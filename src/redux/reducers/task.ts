import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DeletedTask, Task, UpdatedTask } from "../../interfaces/task";

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
    FETCH_SUCCESS: (store: initialTask, actions: PayloadAction<Task[]>) => {
      store.loading = false;
      store.data = actions.payload;
    },
    FETCH_FAILURE: (store: initialTask) => {
      store.loading = false;
      store.error = true;
    },
    POST_START: (store: initialTask) => {
      store.loading = true;
    },
    POST_SUCCESS: (store: initialTask, actions: PayloadAction<Task>) => {
      store.loading = false;
      store.data.push(actions.payload);
    },
    POST_FAILURE: (store: initialTask) => {
      store.loading = false;
      store.error = true;
    },
    UPDATE_START: (store: initialTask) => {
      store.loading = true;
    },
    UPDATE_SUCCESS: (
      store: initialTask,
      actions: PayloadAction<UpdatedTask>
    ) => {
      const newTask = actions.payload.update;
      const tasks = actions.payload.data;
      const newTasks: Task[] = [];

      tasks.map((task: Task) => {
        if (task.id === newTask.id) {
          console.log(newTask.category);
          newTasks.push(newTask);
        } else {
          newTasks.push(task);
        }
      });

      store.loading = false;
      store.data = newTasks;
    },
    UPDATE_FAILURE: (store: initialTask) => {
      store.loading = false;
      store.error = true;
    },
    DELETE_START: (store: initialTask) => {
      store.loading = true;
    },
    DELETE_SUCCESS: (
      store: initialTask,
      actions: PayloadAction<DeletedTask>
    ) => {
      store.loading = false;
      store.data = actions.payload.data.filter(
        (task: Task) => task.id !== actions.payload.id
      );
    },
    DELETE_FAILURE: (store: initialTask) => {
      store.loading = false;
      store.error = true;
    },
  },
});

export const {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  POST_START,
  POST_SUCCESS,
  POST_FAILURE,
  UPDATE_START,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} = Tasks.actions;

export default Tasks.reducer;
