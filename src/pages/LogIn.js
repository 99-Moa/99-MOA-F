import { useLocation } from "react-router-dom";
import ToLogIn from "../components/parkmade/logInSignUp/ToLogIn";

const LogIn = () => {
  if (localStorage.getItem("access_token")) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  return (
    <ToLogIn />
  );
}

export default LogIn;