import React from "react";

export default function CannabisDetails({ details }) {
  // const { details } = props;

  // if (!details) {
  //     return ('Finding, please wait')
  // }

  return (
    <div className="div-cannabis">
      <h3>{details.strain} </h3>
      <p>Type:{details.type}</p>
      <p>Flavor:{details.flavor}</p>
      <p>Effect:{details.effect}</p>
      <p>Description:{details.description}</p>
    </div>
  );
}

// strain:
// type:
// effect:
// flavor:
// description:
