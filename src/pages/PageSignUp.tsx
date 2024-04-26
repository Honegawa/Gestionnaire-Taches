import "./PageSignUp.css";
import { useState } from "react";
import axios from "axios";
import { URL } from "../utils/constants/url.ts";
import { User } from "../interfaces/user.ts";
import { Link } from "react-router-dom";

function PageSignUp() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isCreated, setIsCreated] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((user: User) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(URL.USER_SIGN_UP, user);
      const { status } = response;
      

      if (status === 201) {
        setIsCreated(true);
        console.log('status 201', isCreated);
      } else {
        setIsCreated(false);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('avant return', isCreated);

  return (
    <>
      { console.log('jsx is created :', isCreated) }
      <h1>Inscription</h1>
      {
        isCreated?
          (
            <p>Féliciation, vous êtes bien inscrit !</p>
          )
          :
          (
            <form onSubmit={handleSubmit}>
              <div className="signUpForm">
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
      
                <div>
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                  />
                </div>
                <button>S'Inscrire</button>
              </div>
          </form>
        )
      }

      <Link to="/">
        <button>Retour à l'accueil</button>
      </Link>
    </>
  );
}

export default PageSignUp;
