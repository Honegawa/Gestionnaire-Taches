import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/context/AuthContext";
import "./style.css";
import { UserContext } from "../../interfaces/user";

const Header = () => {
  const { user, disconnect } = useContext(AuthContext) as UserContext;
  const navigate = useNavigate();

  useEffect(() => {}, [user]);

  const handleDisconnect = () => {
    disconnect();
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="header__links">
        {user ? (
          <>
            Bienvenue !
            <button onClick={handleDisconnect}>Se Deconnecter</button>
          </>
        ) : (
          <>Vous n'êtes pas connecté !</>
        )}
      </nav>
    </header>
  );
};

export default Header;
