import React, { useState, useEffect } from "react";
import CannabisDetails from "./CannabisDetails";
import { dummyStrains } from "../../data/dummyData";

import { axiosWithAuth } from "../../utils/axiosWithAuth";

export default function CannabisStrains() {
const [strains, setStrains] = useState(dummyStrains);

useEffect(() => {
    const getStrains = () => {
      axiosWithAuth()
      .get('https://med-cabinet-build-week.herokuapp.com/api/strains')
        .then(res => {
          setStrains(res.data)
        })
        .catch(err => {
          console.log('Error')
        })
    }
    getStrains();
  }, []);
  
    return (
        <div>
            {
                strains.map(x => {
                    return <CannabisDetails key={x.id} details={x} />
                })
            }
        </div>
    )
}