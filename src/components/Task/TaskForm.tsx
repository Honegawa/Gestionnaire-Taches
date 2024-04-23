import "./TaskForm.css";
import React, { useContext, useEffect, useState } from "react";
import { PRIORITY } from "../../utils/constants/priority";
import axios from "axios";
import { URL } from "../../utils/constants/url";
import { Task } from "../../interfaces/task";
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
  const [task, setTask] = useState(data ?? {});
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
      setTask((newTask: Task) => ({
        ...newTask,
        [name]: new Date(value).toISOString(),
      }));
    } else {
      setTask((newTask: Task) => ({ ...newTask, [name]: value }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postTask();
  };

  const postTask = async () => {
    if (user) {
      // dispatch post start
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Basic ${user.token}`,
        };

        const response = await axios.post(
          URL.TASKS,
          { ...task, done: data?.done ?? false },
          { headers: headers }
        );
        console.log(response);
        // dispatch post succes si status 201
        onComplete();
      } catch (error) {
        // dispatch post failure
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
        <div className="flexRowForm">
          <div className="flexRowTop">
            <input
              type="text"
              name="title"
              placeholder="Titre"
              onChange={handleChangeInput}
              required
            />
            <textarea
              name="content"
              placeholder="Contenu"
              onChange={handleChangeInput}
              rows={3}
              required
            />
            <select
              name="priority"
              defaultValue=""
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
              defaultValue=""
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
              onChange={handleChangeInput}
              required
            />
          </div>
          <button>Enregistrer</button>
        </div>
      </form>
    </>
  );
}

export default TaskForm;
