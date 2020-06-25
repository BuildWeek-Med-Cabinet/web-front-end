import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    width: 30%;
    margin: 5px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const CardContainer = styled.div`
  padding: 10px;
`
const Name = styled.div`
  font-size: 1rem;
`
const Flavor = styled.div`
  font-size: 0.75rem;
` 
const Effects = styled.div`
  font-size: 0.75rem;
` 

const CannabisCard = ({ strain }) => {
  return (
    <Card>
      <Name>{strain.name}</Name>
      <CardContainer>
        <Flavor>Flavors:&nbsp;
          {strain.flavors.map(flavor => {
            return (
              <span>{flavor}&nbsp;</span>
            )
          })}
        </Flavor><br />
        <Effects>Effects:&nbsp; 
          {strain.effects.map(effect => {
            return (
              <span>{effect}&nbsp;</span>
            )
          })}
        </Effects>
      </CardContainer> 
    </Card>
    );
};

export default CannabisCard;