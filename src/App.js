import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import PreferenceForm from "./components/PrefernecePage/index";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/preferences" component={PreferenceForm} />
      </Switch>
    </div>
  );
}

export default App;
