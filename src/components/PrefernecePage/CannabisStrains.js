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

const StyledCard = styled.div`
  margin: 1%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  /* height: 60vh; */
`;

const defaultArray = [];

export default function CannabisStrains({ items, updateItems }) {
  const [strains, setStrains] = useState(defaultArray);

  useEffect(() => {
    axiosWithAuth()
      .get(
        "https://cors-anywhere.herokuapp.com/https://weed-data-bw.herokuapp.com/web_layout_strains"
      )
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

  return (
    <div>
      <TitleContainer>
        <Title>Here are some popular choices!</Title>
      </TitleContainer>
      <StyledCard>
        {strains.map((x, i) => {
          return (
            <div>
              <CannabisCard key={i} details={x} />
            </div>
          );
        })}
      </StyledCard>
    </div>
  );
}
