import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    width: 30%;
    margin: 5px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    border: 1px solid lightgrey;
`
const CardContainer = styled.div`
  padding: 10px;
  width: 100%;
`
const Name = styled.div`
  font-size: 1.75rem;
`
const Flavor = styled.ul`
  font-size: 0.75rem;
  margin: 0px;
` 
const Effects = styled.ul`
  font-size: 0.75rem;
  margin: 0px;
` 

const CannabisCard = ({ strain }) => {
  return (
    <Card>
      <Name>{strain.name}</Name>
      <CardContainer>
        <label>Flavors
        <Flavor>
          {strain.flavors.map(flavor => {
            return (
              <li>{flavor}</li>
            )
          })}
        </Flavor>
        </label>
        <label>Effects
        <Effects>
          {strain.effects.map(effect => {
            return (
              <li>{effect}</li>
            )
          })}
        </Effects>
        </label>
      </CardContainer> 
    </Card>
    );
};

export default CannabisCard;