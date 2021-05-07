import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    const payload = {
      username,
      password,
    };

    console.log(payload);

    const res = await axios.post("http://localhost:5000/auth/login", payload);

    console.log(res.data);

    login(res.data.token, res.data.user);

    setUsername("");
    setPassword("");
  };

  return (
    <Box mt={4}>
      <form onSubmit={loginHandler}>
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
          <Button color="primary" variant="contained" type="submit">
            Login
          </Button>
        </Box>
        <Box mt={2}>
          <Button
            color="secondary"
            variant="text"
            to="/register"
            component={Link}
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
