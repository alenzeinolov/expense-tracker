import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Tracker from "./components/Tracker";
import AuthContext from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <Auth>
        <Layout>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/" exact>
              <Tracker />
            </Route>
          </Switch>
        </Layout>
      </Auth>
    </Router>
  );
}

export default App;
