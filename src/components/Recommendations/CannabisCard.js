import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    box-shadow: inset 4px 3px 20px 16px rgba(0,0,0,0.2);
    width: 248px;
    margin: 5px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    border: 1px solid #173d53;
    background-color: #25b3a7;
    color: #173d53;
    border-radius: 5px;
`
const CardContainer = styled.div`
  padding: 10px;
  width: 100%;
`
const Name = styled.div`
  font-size: 1.5rem;
  padding-bottom: 2px;
  border-bottom: 1px solid #173d53;
`
const Flavor = styled.ul`
  font-size: 0.75rem;
  margin: 0px;
` 
const Effects = styled.ul`
  font-size: 0.75rem;
  margin: 0px;
` 

const CannabisCard = ({ details }) => {
  return (
    <Card>
      <Name>{details.name}</Name>
      <CardContainer>
        <label>Flavors
        <Flavor>
          {details.flavors.map((flavor,i) => {
            return (
              <li key={i}>{flavor}</li>
            )
          })}
        </Flavor>
        </label>
        <label>Effects
        <Effects>
          {details.effects.map((effect,i) => {
            return (
              <li key={i}>{effect}</li>
            )
          })}
        </Effects>
        </label>
        <p>{details.description}</p>
      </CardContainer> 
    </Card>
    );
};

export default CannabisCard;