import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const useAuth = () => {
  const history = useHistory();

  const { token } = useContext(AuthContext);

  if (!token) {
    history.replace("/login");
  }
};

export default useAuth;
