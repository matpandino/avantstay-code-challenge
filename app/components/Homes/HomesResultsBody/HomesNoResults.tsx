import Image from "next/image";
import React from "react";
import styled from "styled-components";

import SatelliteIllustration from "../../../assets/illustration.svg";
import { Button } from "../../Button";

const HomesNoResults = () => {
  return (
    <Container>
      <Image src={SatelliteIllustration} alt="Satellite Illustration" />
      <p>
        Oops! We haven’t found anything mathing your search. <br />
        Try something else or reset the filters to see all region homes.
      </p>
      <Button size="lg" label="See all {region} homes" outlined />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  p {
    margin: 40px;
    font-weight: 400;
    font-size: 16px;
    color: #505051;
  }
  button {
    width: 211px;
  }
`;
export default HomesNoResults;
