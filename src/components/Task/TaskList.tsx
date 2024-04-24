import "./TaskList.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { URL } from "../../utils/constants/url";
import {
  DeletedTask,
  RootState as RootStateTask,
  Task,
  TaskFilters,
  UpdatedTask,
} from "../../interfaces/task";
import TaskForm from "./TaskForm";
import { AuthContext } from "../../utils/context/AuthContext";
import { UserContext } from "../../interfaces/user";
import { useDispatch, useSelector } from "react-redux";
import { filteredTasks } from "../../service/selector/task.selector";
import * as ACTIONS_CAT from "../../redux/reducers/category";
import * as ACTIONS_TASK from "../../redux/reducers/task";
import { getCategoryNameFromId } from "../../utils/helpers/category.helper";
import {
  Category,
  RootState as RootStateCategory,
} from "../../interfaces/category";
import { allCategories } from "../../service/selector/category.selector";
import { priorityFromNum } from "../../utils/helpers/task.helper";
import { PRIORITY } from "../../utils/constants/priority";

function TaskList() {
  const [canCreate, setCanCreate] = useState(false);
  const [editTaskId, setEditTaskId] = useState(-1);
  const [filters, setFilters] = useState<TaskFilters>({
    title: "",
    content: "",
    priority: 0,
    category: "",
    done: "all",
  });
  const { user } = useContext(AuthContext) as UserContext;

  const dispatch = useDispatch();
  const storeTask: Task[] = useSelector((state: RootStateTask) =>
    filteredTasks(state)
  );
  const storeCategories: Category[] = useSelector((state: RootStateCategory) =>
    allCategories(state)
  );

  useEffect(() => {
    getTasks();
    fetchCategories();
  }, [user]);

  const handleClickStatus = (task: Task) => {
    updateStatusTask(task);
  };

  const handleClickCreate = () => {
    setCanCreate(true);
  };

  const handleHideCreate = () => {
    setCanCreate(false);
  };

  const handleClickModify = (id: number) => {
    setEditTaskId(id);
  };

  const handleClickDelete = async (id: number) => {
    const isConfirmed = confirm("Voulez-vous supprimer cette tâche?");
    if (user && isConfirmed) {
      dispatch(ACTIONS_TASK.DELETE_START());
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Basic ${user.token}`,
        };

        const response = await axios.delete(`${URL.TASKS}/${id}`, {
          headers: headers,
        });
        console.log(response);
        const { status } = response;

        if (status === 204) {
          const deletedTask: DeletedTask = {
            data: storeTask,
            id: id,
          };

          dispatch(ACTIONS_TASK.DELETE_SUCCESS(deletedTask));
        }
      } catch (error) {
        dispatch(ACTIONS_TASK.DELETE_FAILURE());
        console.error(error);
      }
    }
  };

  const handleChangeFilterValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    let newFilters: TaskFilters;

    if (name === "priority") {
      if (Number(value) < 0 || Number(value) > 4) {
        newFilters = { ...filters, [name]: 0 };
      } else {
        newFilters = { ...filters, [name]: Number(value) };
      }
    } else {
      newFilters = { ...filters, [name]: value };
    }

    setFilters(newFilters);
    dispatch(ACTIONS_TASK.FILTERS_UPDATE(newFilters));
  };

  const handleClickResetFilter = () => {
    const initialState: TaskFilters = {
      title: "",
      content: "",
      priority: 0,
      category: "",
      done: "all",
    };
    setFilters(initialState);
    dispatch(ACTIONS_TASK.FILTERS_UPDATE(initialState));
  };

  const getTasks = async () => {
    if (user) {
      dispatch(ACTIONS_TASK.FETCH_START());
      try {
        const headers = {
          Authorization: `Basic ${user.token}`,
        };

        const response = await axios.get(URL.TASKS, { headers: headers });

        console.log(response);
        const { data, status } = response;
        if (status === 200) {
          dispatch(ACTIONS_TASK.FETCH_SUCCESS(data));
        }
      } catch (error) {
        dispatch(ACTIONS_TASK.FETCH_FAILURE());
      }
    }
  };

  const updateStatusTask = async (task: Task) => {
    const isConfirmed = confirm("Voulez-vous changer le statut cette tâche ?");
    if (user && isConfirmed) {
      dispatch(ACTIONS_TASK.UPDATE_START());
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Basic ${user.token}`,
        };

        const response = await axios.put(
          `${URL.TASKS}/${task.id}`,
          { ...task, done: !task.done },
          {
            headers: headers,
          }
        );
        console.log(response);
        const { data, status } = response;

        if (status === 200) {
          const newTask = {
            ...data,
            category: {
              id: task.categoryId,
              name: getCategoryNameFromId(task.categoryId, storeCategories),
            },
          };

          const updatedTask: UpdatedTask = {
            data: storeTask,
            update: newTask,
          };

          dispatch(ACTIONS_TASK.UPDATE_SUCCESS(updatedTask));
        }

        dispatch(ACTIONS_TASK.UPDATE_START());
      } catch (error) {
        dispatch(ACTIONS_TASK.UPDATE_FAILURE());
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
      <h2>{`Vos tâches ${
        filters.done === "true"
          ? "terminées"
          : filters.done === "false"
          ? "en cours"
          : ""
      } (${storeTask.length})`}</h2>
      {!canCreate && (
        <button onClick={handleClickCreate}>Ajouter une nouvelle tâche</button>
      )}
      <fieldset className="filter">
        <legend>Filtres</legend>
        <div className="flexRow">
          <div className="flexCol">
            <label htmlFor="filterTitle">Titre</label>
            <input
              type="text"
              id="filterTitle"
              name="title"
              onChange={handleChangeFilterValue}
              value={filters.title}
            />
          </div>
          <div className="flexCol">
            <label htmlFor="filterContent">Contenu</label>
            <input
              type="text"
              id="filterContent"
              name="content"
              onChange={handleChangeFilterValue}
              value={filters.content}
            />
          </div>
          <div className="flexCol">
            <label htmlFor="filterPriority">Priorité</label>
            <select
              id="filterPriority"
              name="priority"
              value={filters.priority}
              onChange={handleChangeFilterValue}
            >
              <option value="" hidden>
                Choisir Priorité
              </option>
              <option value={PRIORITY.URGENT}>Urgent</option>
              <option value={PRIORITY.IMPORTANT}>Important</option>
              <option value={PRIORITY.DELEGABLE}>Délégable</option>
              <option value={PRIORITY.OPTIONAL}>Optionnel</option>
            </select>
          </div>
          <div className="flexCol">
            <label htmlFor="filterCategory">Catégorie</label>
            <input
              type="text"
              id="filterCategory"
              name="category"
              onChange={handleChangeFilterValue}
              value={filters.category}
            />
          </div>
          <div className="flexCol">
            <label>Statut</label>
            <div className="flexRow">
              <input
                type="radio"
                id="filterStatusAll"
                name="done"
                value={"all"}
                checked={filters.done === "all"}
                onChange={handleChangeFilterValue}
              />
              <label htmlFor="filterStatusAll">Tous</label>
            </div>
            <div className="flexRow">
              <input
                type="radio"
                id="filterStatusDone"
                name="done"
                value={"true"}
                checked={filters.done === "true"}
                onChange={handleChangeFilterValue}
              />
              <label htmlFor="filterStatusDone">Terminée</label>
            </div>
            <div className="flexRow">
              <input
                type="radio"
                id="filterStatusUndone"
                name="done"
                value={"false"}
                checked={filters.done === "false"}
                onChange={handleChangeFilterValue}
              />
              <label htmlFor="filterStatusUndone">Pas terminée</label>
            </div>
          </div>
          <button onClick={handleClickResetFilter}>Reset</button>
        </div>
      </fieldset>
      <table className="taskList">
        <thead>
          <tr>
            <th className="td-20">Titre</th>
            <th className="td-30">Contenu</th>
            <th className="td-10">Priorité</th>
            <th className="td-10">Catégorie</th>
            <th className="td-10">Expiration</th>
            <th className="td-10">Statut</th>
            <th className="td-10">Actions</th>
          </tr>
        </thead>
        <tbody>
          {storeTask.map((task: Task, index: number) =>
            editTaskId === task.id ? (
              <tr key={task.id}>
                <td colSpan={7}>
                  <TaskForm
                    data={task}
                    onComplete={() => handleClickModify(-1)}
                    tasks={storeTask}
                    categories={storeCategories}
                  />
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td>
                  <h3>{task.title}</h3>
                </td>
                <td>
                  <p>{task.content}</p>
                </td>
                <td>{priorityFromNum(task.priority)}</td>
                <td>{task.category.name}</td>
                <td>{new Date(task.expiration).toLocaleDateString()}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleClickStatus(task)}
                  />
                </td>
                <td>
                  <div className="actions">
                    <button onClick={() => handleClickModify(task.id)}>
                      ✎
                    </button>
                    <button onClick={() => handleClickDelete(task.id)}>
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
          {canCreate && (
            <tr>
              <td colSpan={7}>
                <TaskForm
                  onComplete={handleHideCreate}
                  categories={storeCategories}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TaskList;
