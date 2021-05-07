import { useState, useCallback } from "react";
import { useHistory } from "react-router";
import AuthContext from "../contexts/AuthContext";

const authData = localStorage.getItem("auth");
let initialToken = "";
let initialUser = null;
if (authData) {
  const data = JSON.parse(authData);
  initialToken = data.token;
  initialUser = data.user;
}

const Auth = ({ children }) => {
  const history = useHistory();

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const login = useCallback(
    (token, user) => {
      console.log(token, user);
      localStorage.setItem("auth", JSON.stringify({ token, user }));

      setToken(token);
      setUser(user);
      history.replace("/");
    },
    [history]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("auth");

    setToken("");
    setUser(null);
    history.replace("/login");
  }, [history]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
