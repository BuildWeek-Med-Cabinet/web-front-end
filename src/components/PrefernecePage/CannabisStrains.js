import React, { useState, useEffect } from "react";
import CannabisDetails from "./CannabisDetails";
import { axiosWithAuth } from "../../utils";

const defaultArray = [
  {
    strain: "",
    type: "",
    effect: "",
    flavor: "",
    description: "",
  },
];

export default function CannabisStrains({ item }) {
  const [strains, setStrains] = useState(defaultArray);

  useEffect(() => {
    const getStrains = () => {
      axiosWithAuth()
        .get("https://med-cabinet-build-week.herokuapp.com/api/strains")
        .then((res) => {
          setStrains(res.data);
        })
        .catch((err) => {
          console.log("Error");
        });
    };
    getStrains();
  }, []);

  return (
    <div>
      <div>
        {strains.map((x) => {
          return <CannabisDetails key={x.id} details={x} />;
        })}
      </div>
    </div>
  );
}
