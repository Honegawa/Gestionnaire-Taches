import Template from "./Template";
import { AuthContext } from "../../utils/context/AuthContext";
import { useContext } from "react";
import { UserContext } from "../../interfaces/user";
import { Navigate } from "react-router-dom";

const TemplateNotLogged = () => {

  const { user } = useContext(AuthContext) as UserContext;

  return (
    <>
      {!user ? (
          <Template/>
        ) : (
          <Navigate to="/dashboard"/>
        )
      }
    </>
  )
}

export default TemplateNotLogged;
