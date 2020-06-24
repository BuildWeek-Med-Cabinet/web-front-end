import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import LoginPage from './components/LoginPage';
import PrivateRoute from "./components/PrivateRoute";
import PreferenceForm from "./components/PrefernecePage/index";
import { settings } from "./components/store/actions";
import { connect } from "react-redux";
import CannabisStrains from './components/PrefernecePage/CannabisStrains'

function App(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={LoginPage} />
        <Route path="/strains" component={() => <CannabisStrains />} />
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
