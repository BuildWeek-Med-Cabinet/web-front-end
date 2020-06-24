import React from "react";

const Flavor = (props) => {
  const { flavor, checked, checkHandler } = props;
  return (
    <div className="flavor">
      <label>
        <input
          type="checkbox"
          name={flavor}
          checked={checked}
          onChange={checkHandler}
        />
      </label>
    </div>
  );
};

export default Flavor;
