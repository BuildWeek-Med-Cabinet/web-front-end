import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import PreferenceForm from "./components/PrefernecePage/index";
import { settings } from "./components/store/actions";
import { connect } from "react-redux";

function App(props) {
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

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
  };
};

export default connect(mapStateToProps, {
  logout: settings.signOut,
})(App);
