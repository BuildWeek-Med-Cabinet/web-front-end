import React, { useState, useEffect } from "react";
import CannabisDetails from "./CannabisDetails";
import { axiosWithAuth } from "../../utils";
import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Title = styled.div`
  font-size: 2rem;
  color: white;
`

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
      <TitleContainer>
        <Title>Here are some popular choices!</Title>
      </TitleContainer>
      <div className='strains-container'>
        {strains.map((x) => {
          return <CannabisDetails key={x.id} details={x} />;
        })}
      </div>
    </div>
  );
}
