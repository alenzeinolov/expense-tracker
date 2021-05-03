import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import useAuth from "../utils/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Layout = ({ children }) => {
  useAuth();
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();

  const logout = async () => {
    const res = await fetch("http://localhost:5000/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(res);
      console.log(data);
      return;
    }
    setUser(null);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Expense Tracker
            </Typography>
            {user ? (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>

      <Box mt={6}>
        <Container>{children}</Container>
      </Box>
    </>
  );
};

export default Layout;
