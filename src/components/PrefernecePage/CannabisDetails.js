import React from "react";

export default function CannabisDetails({ details }) {
    // const { details } = props;

    // if (!details) {
    //     return ('Finding, please wait')
    // }

    return(
        <div className='div-cannabis'>
            <h1>{details.name} </h1>
            <p><br>Type:{details.type}</br></p>
            <p><br>Flavor:{details.flavor}</br></p>
            <p><br>Effect:{details.effect}</br></p>
            <p><br>Description:{details.description}</br></p>
        </div>
    )
}
   