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
import Expenses from "./components/Expenses";

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
              <Expenses />
            </Route>
          </Switch>
        </Layout>
      </Auth>
    </Router>
  );
}

export default App;
