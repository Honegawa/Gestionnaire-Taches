import "./TaskList.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { URL } from "../../utils/constants/url";
import { Task, RootState } from "../../interfaces/task";
import TaskForm from "./TaskForm";
import { AuthContext } from "../../utils/context/AuthContext";
import { UserContext } from "../../interfaces/user";
import { useDispatch, useSelector } from "react-redux";
import { allTasks } from "../../service/selector/task.selector";

import * as ACTIONS from "../../redux/reducers/task";

function TaskList() {
  const [canCreate, setCanCreate] = useState(false);
  const [editTaskId, setEditTaskId] = useState(-1);
  const { user } = useContext(AuthContext) as UserContext;

  const dispatch = useDispatch();

  const store: Task[] = useSelector((state: RootState) => allTasks(state))

  useEffect(() => {
    getTasks();
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
      // dispatch delete start
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Basic ${user.token}`,
        };

        const response = await axios.delete(`${URL.TASKS}/${id}`, {
          headers: headers,
        });
        console.log(response);
        // dispatch delete success si status 204
      } catch (error) {
        // dispatch delete failure
        console.error(error);
      }
    }
  };

  const getTasks = async () => {

    if (user) {
       dispatch(ACTIONS.FETCH_START());
      try {
        const headers = {
          Authorization: `Basic ${user.token}`,
        };

        const response = await axios.get(URL.TASKS, { headers: headers });

        console.log(response);
        const { data, status } = response;
        if (status === 200) {
          dispatch(ACTIONS.FETCH_SUCCESS(data));
        }
      } catch (error) {
        dispatch(ACTIONS.FETCH_FAILURE());
      }
    }
  };

  const updateStatusTask = async (task: Task) => {
    const isConfirmed = confirm("Voulez-vous changer le statut cette tâche ?");
    if (user && isConfirmed) {
      // dispatch update start
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
        // dispatch update success si status 200
      } catch (error) {
        // dispatch update failure
        console.error(error);
      }
    }
  };

  const priorityFromNum = (num: number): string => {
    let res = "";

    switch (num) {
      case 1:
        res = "Urgent";
        break;
      case 2:
        res = "Important";
        break;
      case 3:
        res = "Delegable";
        break;
      case 4:
        res = "Optionnel";
        break;

      default:
        break;
    }

    return res;
  };

  return (
    <>
      <h2>Vos tâches</h2>
      {!canCreate && (
        <button onClick={handleClickCreate}>Ajouter une nouvelle tâche</button>
      )}
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
          {store.map((task: Task, index: number) =>
            editTaskId === task.id ? (
              <tr key={task.id}>
                <td colSpan={7}>
                  <TaskForm
                    data={task}
                    onComplete={() => handleClickModify(-1)}
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
                <TaskForm onComplete={handleHideCreate} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TaskList;
