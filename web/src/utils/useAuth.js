import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const useAuth = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch("http://localhost:5000/auth/me", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        setUser(null);
        history.push("/login");
        return;
      }
      setUser({ user: "asd" });
    };
    fetchMe();
  }, [history]);
};

export default useAuth;
