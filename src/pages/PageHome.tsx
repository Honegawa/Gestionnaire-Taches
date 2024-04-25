import { Link } from "react-router-dom";
import SignIn from "../components/SignIn/SignIn";

function PageHome() {
  return (
    <>
      <h1>Gestionnaire des tâches</h1>
      <SignIn />

      <p>
        Vous n'avez pas de compte? Inscrivez-vous <Link to="/sign-up">ici</Link>
      </p>
    </>
  );
}

export default PageHome;
