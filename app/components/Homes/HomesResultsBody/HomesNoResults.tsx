import Image from "next/image";
import React from "react";
import styled from "styled-components";

import SatelliteIllustration from "../../../assets/illustration.svg";
import useHomes from "../../../contexts/HomesContext/useHomes";
import { Button } from "../../Button";

const HomesNoResults = () => {
  const {
    filters: { regionName },
  } = useHomes();
  const regionsNameParsed =
    !regionName || regionName === "all" ? "" : regionName;

  return (
    <Container>
      <div>
        <Image src={SatelliteIllustration} alt="Satellite Illustration" />
      </div>
      <p>
        Oops! We haven’t found anything matching your search. <br />
        Try something else or reset the filters to see all {
          regionsNameParsed
        }{" "}
        homes.
      </p>
      <Button size="lg" label={`See all ${regionsNameParsed} homes`} outlined />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  p {
    margin: 40px;
    font-weight: 400;
    font-size: 16px;
    color: #505051;
  }
  button {
    width: 211px;
  }

  div {
    -webkit-animation: mover 2s infinite alternate;
    animation: mover 2s infinite alternate;
  }

  @-webkit-keyframes mover {
    0% {
      transform: translateY(5px);
    }
    100% {
      transform: translateY(-5px);
    }
  }
  @keyframes mover {
    0% {
      transform: translateY(5px);
    }
    100% {
      transform: translateY(-5px);
    }
  }
`;
export default HomesNoResults;
