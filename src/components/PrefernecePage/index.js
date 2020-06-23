import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import flavor from "./flavor";
import effect from "./effect";

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
      <h2>Preferences</h2>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <h2>Flavors</h2>
            <h3>Please select up to 5</h3>
            <div>
              {flavor.map((item, index) => {
                return (
                  <div className="flavors">
                    <Flavor
                      key={index}
                      flavor={item}
                      checked={props.flavors.includes(item) ? true : false}
                      checkHandler={props.toggleFlavor}
                    />
                  </div>
                );
              })}
            </div>
            <h2>Effects</h2>
            <h3>Please select up to 5</h3>
            <div className="effects">
              {effect.map((item, index) => (
                <div>
                  <Effect
                    key={index}
                    effect={item}
                    checked={props.effects.includes(item) ? true : false}
                    checkHandler={props.toggleEffect}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default PreferenceForm;
