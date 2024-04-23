import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../../utils/constants/url";
import { Category } from "../../interfaces/category";
import { AuthContext } from "../../utils/context/AuthContext";
import { UserContext } from "../../interfaces/user";
import { useDispatch } from "react-redux";

import * as ACTIONS from "../../redux/reducers/category";

const AddCategory = () => {
  const [category, setCategory] = useState({});
  const { user } = useContext(AuthContext) as UserContext;
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCategory((category: Category) => ({ ...category, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user) {
      dispatch(ACTIONS.POST_START());
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Basic ${user.token}`,
        };
        const response = await axios.post(
          URL.CATEGORIES,
          { ...category },
          { headers: headers }
        );

        const { data, status } = response;

        console.log(response);
        if (status === 201) {
          dispatch(ACTIONS.POST_SUCCESS(data));
        }

      } catch (e) {
        dispatch(ACTIONS.POST_FAILURE());
        console.log(e);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="category">Créer une catégorie:</label>
        <input
          id="category"
          type="text"
          placeholder="category"
          name="name"
          onChange={handleChange}
        />
        <button type="submit">ok</button>
      </form>
    </div>
  );
};

export default AddCategory;
