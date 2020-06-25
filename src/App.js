import React from "react";
import { Switch, Route,Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Recommend from './components/Recommendations'
import LoginPage from "./components/LoginPage";
import SignupForm from "./components/SignupForm";
import PrivateRoute from "./components/PrivateRoute";
import PreferenceForm from "./components/PrefernecePage/index";
import { settings } from "./components/store/actions";
import { connect } from "react-redux";
import CannabisStrains from './components/PrefernecePage/CannabisStrains'
import styled from 'styled-components';
import logo from './img/logo.png'

const Header = styled.header`
  display: flex;
  background-color: #2c584d;
`
const Img = styled.img`
  width: 40%;
`
const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%
`


function App(props) {
  return (
    <div>
    <Header>
      <Link to='/'><Img src={logo} alt='logo' /></Link>
      <Nav>
        <Link className='links' to='/recommend'>Recommendations</Link>
        <Link className='links' to='/preferences'>Preferences</Link>
      </Nav>
    </Header>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <PrivateRoute path="/recommend" component={Recommend} />
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
