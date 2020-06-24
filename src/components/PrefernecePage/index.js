import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Flavor from "./flavor";
import Effect from "./effect";

const PreferenceForm = (props) => {
  const { push } = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    const req = {
      id: props.id,
      prefs: { Flavors: props.flavors, Effects: props.effects },
    };
    //Figure out how backend wants data structured for the post
    props.setPrefs(req);
    push("");
  };

  return (
    <div>
      <h1>Preferences</h1>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <h2>Flavors</h2>
            <h3>Please select up to 5</h3>

            <h2>Effects</h2>
            <h3>Please select up to 5</h3>
          </div>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  //   const p = state.signup;
  return {
    // flavors: p.flavors,
    // effects: p.effects,
    // errors: p.errors,
    // id: state.user.id,
  };
};

export default connect(mapStateToProps, {
  //   toggleFlavor: signup.toggleFlavor,
  //   toggleEffect: signup.toggleEffect,
  //   setPrefs: signup.setPrefs,
})(PreferenceForm);
