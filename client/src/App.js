import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Landing from "./components/layout/Landing";
import NavBar from "./components/layout/NavBar";
import Profile from "./components/layout/Profile";
import NotFound from "./components/layout/NotFound";
import PrivateRoute from "./components/routing/PrivateRoute";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "./App.css";

axios.defaults.withCredentials = true;

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
