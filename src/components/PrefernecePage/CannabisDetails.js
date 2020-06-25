import React from "react";

export default function CannabisDetails({ details }) {

    return(
        <div className='div-cannabis'>
            <h1>{details.name} </h1>
            <p>Flavors:&nbsp;
                {details.flavors.map(flavor => {
                    return (
                    <span>{flavor},&nbsp;</span>
                    )
                })}
            </p>
            <p>Effect:&nbsp;
                {details.effects.map(effect => {
                return (
                    <span>{effect},&nbsp;</span>
                )
                })}
            </p>
            <p>Description:&nbsp;{details.description}</p>

        </div>
    )
}
   