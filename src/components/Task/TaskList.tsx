import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { URL } from "../../utils/constants/url";
import { Task } from "../../interfaces/task";
import TaskForm from "./TaskForm";
import { AuthContext } from "../../utils/context/AuthContext";
import { UserContext } from "../../interfaces/user";

function TaskList() {
  // Solution temporaire. Utiliser le store de redux
  const [tasks, setTasks] = useState([]);
  const [canCreate, setCanCreate] = useState(false);
  const { user } = useContext(AuthContext) as UserContext;

  useEffect(() => {
    getTasks();
  }, [user]);

  const handleClickDone = () => {
    console.log("TODO DONE/UNDONE");
  };

  const handleClickCreate = () => {
    setCanCreate(true);
  };

  const handleHideCreate = () => {
    setCanCreate(false);
  };

  const getTasks = async () => {
    // dispatch start
    if (user) {
      try {
        // dispatch success
        const headers = {
          Authorization: `Basic ${user.token}`,
        };

        const response = await axios.get(URL.TASKS, { headers: headers });

        console.log(response);
        const { data, status } = response;
        if (status === 200) {
          setTasks(data);
        }
      } catch (error) {
        //dispatch failure
      }
    }
  };

  const priorityFromNum = (num: number): string => {
    let res = "";

    switch (num) {
      case 0:
        res = "Urgent";
        break;
      case 1:
        res = "Important";
        break;
      case 2:
        res = "Delegable";
        break;
      case 3:
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
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Contenu</th>
            <th>Priorité</th>
            <th>Catégorie</th>
            <th>Expiration</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((e: Task, index: number) => (
            <tr key={index}>
              <td>
                <h3>{e.title}</h3>
              </td>
              <td>{e.content}</td>
              <td>{priorityFromNum(e.priority)}</td>
              <td>{e.category.name}</td>
              <td>{new Date(e.expiration).toLocaleDateString()}</td>
              <td>
                <input
                  type="checkbox"
                  checked={e.done}
                  onChange={handleClickDone}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {canCreate && (
        <div id="create">
          <TaskForm onComplete={handleHideCreate} />
        </div>
      )}
    </>
  );
}

export default TaskList;
