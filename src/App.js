import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Recommend from './components/Recommendations'
import LoginPage from "./components/LoginPage";
import SignupForm from "./components/SignupForm";
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
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/recommend" component={Recommend} />
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
