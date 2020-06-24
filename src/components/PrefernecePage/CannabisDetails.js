import React from "react";

export default function CannabisDetails({ details }) {
    // const { details } = props;

    // if (!details) {
    //     return ('Finding, please wait')
    // }

    return(
        <div className='div-cannabis'>
            <h1>{details.name} </h1>
            <p>Type:{details.type}<br/></p>
            <p>Flavor:{details.flavor}<br/></p>
            <p>Effect:{details.effect}<br/></p>
            <p>Description:{details.description}<br/></p>
        </div>
    )
}
   