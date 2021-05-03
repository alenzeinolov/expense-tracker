import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Expenses from "./components/Expenses";
import Register from "./components/Register";
import UserContext from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Expenses />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
