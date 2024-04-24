import "./TaskForm.css";
import React, { useContext, useEffect, useState } from "react";
import { PRIORITY } from "../../utils/constants/priority";
import axios from "axios";
import { URL } from "../../utils/constants/url";
import { Task, TaskFormData } from "../../interfaces/task";
import { Category, RootState } from "../../interfaces/category";
import { useDispatch, useSelector } from "react-redux";
import { allCategories } from "../../service/selector/category.selector";

import { AuthContext } from "../../utils/context/AuthContext";
import { UserContext } from "../../interfaces/user";
import * as ACTIONS_CAT from "../../redux/reducers/category";

function TaskForm({
  data,
  onComplete,
}: {
  data?: Task;
  onComplete: () => void;
}) {
  const [task, setTask] = useState<TaskFormData>(data ?? { done: false });
  const { user } = useContext(AuthContext) as UserContext;
  const dispatch = useDispatch();

  const store: Category[] = useSelector((state: RootState) =>
    allCategories(state)
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChangeInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = event.target;

    if (type === "date") {
      setTask((newTask: TaskFormData) => ({
        ...newTask,
        [name]: new Date(value).toISOString(),
      }));
    } else {
      setTask((newTask: TaskFormData) => ({ ...newTask, [name]: value }));
    }
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setTask((newTask: TaskFormData) => ({ ...newTask, [name]: checked }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (data) {
      // update
      updateTask(task);
    } else {
      // create
      postTask();
    }
  };

  const postTask = async () => {
    if (user) {
      // dispatch post start
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Basic ${user.token}`,
        };

        const response = await axios.post(URL.TASKS, task, {
          headers: headers,
        });
        console.log(response);
        // dispatch post succes si status 201
        onComplete();
      } catch (error) {
        // dispatch post failure
        console.error(error);
      }
    }
  };

  const updateTask = async (task: Task | TaskFormData) => {
    const isConfirmed = confirm("Voulez-vous modifier cette tâche?");
    if (user && isConfirmed) {
      // dispatch update start
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Basic ${user.token}`,
        };

        const response = await axios.put(`${URL.TASKS}/${task.id}`, task, {
          headers: headers,
        });
        console.log(response);
        // dispatch update success si status 200
        onComplete();
      } catch (error) {
        // dispatch update failure
        console.error(error);
      }
    }
  };

  const fetchCategories = async () => {
    dispatch(ACTIONS_CAT.FETCH_START());
    try {
      const response = await axios.get(URL.CATEGORIES);

      console.log(response);
      const { data, status } = response;
      if (status === 200) {
        dispatch(ACTIONS_CAT.FETCH_SUCCESS(data));
      }
    } catch (error) {
      dispatch(ACTIONS_CAT.FETCH_FAILURE());
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flexRow">
          <input
            type="text"
            name="title"
            placeholder="Titre"
            defaultValue={task?.title ?? ""}
            onChange={handleChangeInput}
            required
          />
          <textarea
            name="content"
            placeholder="Contenu"
            defaultValue={task?.content ?? ""}
            onChange={handleChangeInput}
            rows={3}
            required
          />
          <select
            name="priority"
            defaultValue={task?.priority ?? ""}
            onChange={handleChangeInput}
            required
          >
            <option value="" hidden>
              Choisir Priorité
            </option>
            <option value={PRIORITY.URGENT}>Urgent</option>
            <option value={PRIORITY.IMPORTANT}>Important</option>
            <option value={PRIORITY.DELEGABLE}>Délégable</option>
            <option value={PRIORITY.OPTIONAL}>Optionnel</option>
          </select>
          <select
            name="category"
            defaultValue={task?.category?.id ?? ""}
            onChange={handleChangeInput}
            required
          >
            <option value="" hidden>
              Choisir Catégorie
            </option>
            {store.map((e: Category) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="expiration"
            defaultValue={
              task?.expiration ? task.expiration.substring(0, 10) : ""
            }
            onChange={handleChangeInput}
            required
          />
          <div className="span-10">
            <input
              type="checkbox"
              name="done"
              defaultChecked={task.done}
              onChange={handleChangeChecked}
            />
          </div>
          <div className="span-10">
            <button>Enregistrer</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default TaskForm;
