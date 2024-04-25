import "./style.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { User, UserContext } from "./../../interfaces/user.ts";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext) as UserContext;
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((user: User) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isLogged = await login(user);

    console.log(isLogged);
    if (isLogged == true) navigate("/dashboard");
    else alert("Vos identifiants sont incorrects !");
  };

  return (
    <>
      <h2>Veuillez vous connecter :</h2>
      <form onSubmit={handleSubmit}>
        <div className="loginForm">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <button>Se connecter</button>
        </div>
      </form>
    </>
  );
}

export default SignIn;
