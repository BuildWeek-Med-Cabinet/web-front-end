import React, { useState, useEffect } from "react";
import CannabisCard from ".././Recommendations/CannabisCard";
import { axiosWithAuth } from "../../utils";
import styled from "styled-components";

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  font-size: 2rem;
  color: white;
`;

const defaultArray = [];

export default function CannabisStrains({ items, updateItems }) {
  const [strains, setStrains] = useState(defaultArray);
  const [editing, setEditing] = useState(false);
  const [strainToEdit, setStrainToEdit] = useState(defaultArray);

  useEffect(() => {
    axiosWithAuth()
      .get("https://med-cabinet-build-week.herokuapp.com/api/strains")
      .then((res) => {
        const strainsModified = res.data.map((x) => {
          let y = { ...x };
          y["flavors"] = y["flavors"] ? y["flavors"] : [x.flavor];
          y["effects"] = y["effects"] ? y["effects"] : [x.effect];
          y["description"] = x.description ? x.description : "";
          y["name"] = y["name"] ? y["name"] : x.strain;
          return y;
        });
        setStrains(strainsModified);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  // const editStrains = (strain) => {
  //   setEditing(true)
  //   setStrainToEdit(strain)
  // }

  const deleteStrain = (id) => {
    axiosWithAuth()
      .delete(`https://med-cabinet-build-week.herokuapp.com/api/strains/${id}`)
      .then((res) => {
        console.log(res);
        // updateItems(items.map((item) => (item.id === res.data.id ? res.data : item)))
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <TitleContainer>
        <Title>Here are some popular choices!</Title>
      </TitleContainer>
      <div className="strains-container">
        {strains.map((x, i) => {
          return (
            <div>
              <CannabisCard key={i} details={x} />
              <button onClick={() => deleteStrain(x.id)}>
                Delete this strain?
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
