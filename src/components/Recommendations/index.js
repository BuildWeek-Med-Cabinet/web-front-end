import React, { useState } from "react";
import { connect } from "react-redux";
import CannabisCard from './CannabisCard';
import { dummyStrains } from "../../data/dummyData";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: strecth;
  flex-wrap: wrap;
`
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Title = styled.div`
  font-size: 2rem;
  color: white;
`
const Recommendations = (props) => {

  const [strains] = useState(dummyStrains);

  return (
    <div>
      <TitleContainer>
        <Title>We recommend the following</Title>
      </TitleContainer>
      <Container>
        {strains.map(details => {
          return (
            <CannabisCard details={details} />
          )
        })}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, {})(Recommendations);