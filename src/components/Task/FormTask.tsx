import React, { useEffect, useState } from "react";
import { PRIORITY } from "../../utils/constants/priority";
import axios from "axios";
import { URL } from "../../utils/constants/url";

/**
 *  Pour récupérer un token sans passer par la connexion classique:
 * Aller sur l'interface swagger -> créer un user depuis l'interface -> se connecter depuis l'interface -> regarder le message de retour 
 * */
// temp token pour les tests. A supprimer lorsqu'il y aura l'authentification
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxMzc4NzAzNSwiZXhwIjoxNzEzODczNDM1fQ.fA-qjlL_VKHm9RoJVm--kar-4lA0QzV1-Adr8IOBwL0";

function FormTask() {
  const [task, setTask] = useState({ priority: PRIORITY.DELEGABLE });

  // Solution temporaire. TODO : Utiliser le store de redux pour récupérer les catégories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleChangeInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setTask((newTask) => ({ ...newTask, [name]: value }));
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    postTask();
  };

  const postTask = async () => {
    // dispatch start

    try {
      //dispatch success

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      };

      const response = await axios.post(URL.TASKS, task, { headers: headers });
      console.log(response);
    } catch (error) {
      //dispatch failure
      console.error(error);
    }
  };

  const getCategories = async () => {
    //dispatch start
    try {
      // dispatch success
      const headers = {
        Authorization: `Basic ${token}`,
      };

      const response = await axios.get(URL.CATEGORIES, { headers: headers });

      console.log(response);
      const { data, status } = response;
      if (status === 200) {
        setCategories(data);
      }
    } catch (error) {
      // dispatch failure
      console.error(error);
    }
  };

  // TODO : refacto pour le rendu dans un tableau
  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Titre</legend>
          <input
            type="text"
            name="title"
            onChange={handleChangeInput}
            required
          />
        </fieldset>
        <fieldset>
          <legend>Contenu</legend>
          <textarea name="content" onChange={handleChangeInput} required />
        </fieldset>
        <fieldset>
          <legend>Priorité</legend>
          <select
            name="priority"
            defaultValue={PRIORITY.DELEGABLE}
            onChange={handleChangeInput}
          >
            <option value={PRIORITY.URGENT}>Urgent</option>
            <option value={PRIORITY.IMPORTANT}>Important</option>
            <option value={PRIORITY.DELEGABLE}>Délégable</option>
            <option value={PRIORITY.OPTIONAL}>Optionnel</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Catégorie</legend>
          <select name="category" defaultValue="" onChange={handleChangeInput}>
            <option value="" hidden></option>
            {categories.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </fieldset>
        <button>Enregistrer</button>
      </form>
    </>
  );
}

export default FormTask;
