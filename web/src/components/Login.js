import { useContext, useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);

  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    console.log(JSON.stringify({ username, password }));

    const res = await fetch("http://localhost:5000/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(res);
      console.log(data);
      return;
    }
    setUser(data);
    history.push("/");
  };

  return (
    <div>
      <form onSubmit={loginHandler} noValidate>
        <Box mt={2}>
          <TextField
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/register"
          >
            Register
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
