import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { CssBaseline, makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

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
  const classes = useStyles();

  const { token, logout } = useContext(AuthContext);

  return (
    <>
      <CssBaseline />

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
            {token ? (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" to="/login" component={Link}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>

      <Container maxWidth="sm">{children}</Container>
    </>
  );
};

export default Layout;
