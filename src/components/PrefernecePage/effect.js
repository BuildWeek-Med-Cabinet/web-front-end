import React from "react";
import EffectContext from "../../contexts/index";

const Effect = (props) => {
  const { effect, checked, checkHandler } = props;
  return (
    <div className="effect">
      <label>
        <input
          type="checkbox"
          name={effect}
          checked={checked}
          onChange={checkHandler}
        />
      </label>
    </div>
  );
};

export default Effect;
