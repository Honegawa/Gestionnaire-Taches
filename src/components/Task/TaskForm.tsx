import "./TaskForm.css";
import React, { useContext, useEffect, useState } from "react";
import { PRIORITY } from "../../utils/constants/priority";
import axios from "axios";
import { URL } from "../../utils/constants/url";
import { Task, TaskFormData, UpdatedTask } from "../../interfaces/task";
import { Category } from "../../interfaces/category";
import { useDispatch } from "react-redux";

import { AuthContext } from "../../utils/context/AuthContext";
import { UserContext } from "../../interfaces/user";
import * as ACTIONS from "../../redux/reducers/task";
import { getCategoryNameFromId } from "../../utils/helpers/category.helper";

/**
 *  TaskForm est utilisé pour la création et la mise à jour d'une Task
 *  S'il y a une propriété @param data et @param tasks alors il s'agit d'une mise à jour
 *  Sinon il s'agit de la création
 */
function TaskForm({
  data,
  tasks,
  categories,
  onComplete,
}: {
  data?: Task;
  tasks?: Task[];
  categories: Category[];
  onComplete: () => void;
}) {
  const [task, setTask] = useState<TaskFormData>(data ?? { done: false });
  const { user } = useContext(AuthContext) as UserContext;
  const dispatch = useDispatch();

  useEffect(() => {
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
      dispatch(ACTIONS.POST_START());
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Basic ${user.token}`,
        };

        // on utilise task.category : number pour la création d'une tâche
        const response = await axios.post(URL.TASKS, task, {
          headers: headers,
        });
        console.log(response);
        const { data, status } = response;

        if (status === 201) {
          // task.category est un number lorsqu'on utilise le formulaire
          const catId = task.category;

          if (catId) {
            const newTask = {
              ...data,
              category: {
                id: catId,
                name: getCategoryNameFromId(Number(catId), categories),
              },
            };
            dispatch(ACTIONS.POST_SUCCESS(newTask));
            onComplete();
          }
        }
      } catch (error) {
        dispatch(ACTIONS.POST_FAILURE());
        console.error(error);
      }
    }
  };

  const updateTask = async (task: Task | TaskFormData) => {
    const isConfirmed = confirm("Voulez-vous modifier cette tâche?");
    if (user && isConfirmed) {
      dispatch(ACTIONS.UPDATE_START());
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Basic ${user.token}`,
        };

        // on utilise task.categoryId : number pour la mise à jour d'une tâche
        const response = await axios.put(
          `${URL.TASKS}/${task.id}`,
          { ...task, categoryId: task.category },
          {
            headers: headers,
          }
        );
        console.log(response);
        const { data, status } = response;

        if (status === 200) {
          // task.category est un number lorsqu'on utilise le formulaire
          const catId = task.category;

          if (catId && tasks) {
            const newTask = {
              ...data,
              category: {
                id: catId,
                name: getCategoryNameFromId(Number(catId), categories),
              },
            };

            const updatedTask: UpdatedTask = {
              data: tasks,
              update: newTask,
            };

            dispatch(ACTIONS.UPDATE_SUCCESS(updatedTask));
            onComplete();
          }
        }
      } catch (error) {
        dispatch(ACTIONS.UPDATE_FAILURE());
        console.error(error);
      }
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
            defaultValue={task.categoryId ?? ""}
            onChange={handleChangeInput}
            required
          >
            <option value="" hidden>
              Choisir Catégorie
            </option>
            {categories.map((e: Category) => (
              <option key={`${task.title}-${e.id}`} value={e.id}>
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
