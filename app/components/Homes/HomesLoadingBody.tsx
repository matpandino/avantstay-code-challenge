import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import "react-loading-skeleton/dist/skeleton.css";

const HomesLoadingBody = () => {
  return (
    <Container>
      <HomeLoading />
      <div style={{ width: "100%", height: "7px" }}>
        <Skeleton height="1px" width="100%" />
      </div>
      <HomeLoading />
      <div style={{ width: "100%", height: "7px" }}>
        <Skeleton height="1px" width="100%" />
      </div>
      <HomeLoading />
    </Container>
  );
};

const HomeLoading = () => {
  return (
    <HomeLoadingContainer>
      <div>
        <Skeleton height="208px" borderRadius="2px" />
      </div>
      <div>
        <div>
          <Skeleton height="17px" width="50%" borderRadius="2px" />
          <Skeleton height="28px" width="80%" borderRadius="2px" />
          <Skeleton height="17px" width="90%" borderRadius="2px" />
        </div>
        <div>
          <Skeleton height="17px" width="34%" borderRadius="2px" />
          <Skeleton height="28px" width="41%" borderRadius="2px" />
          <Skeleton height="17px" width="15%" borderRadius="2px" />
        </div>
      </div>
    </HomeLoadingContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`;

const HomeLoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  width: 100%;
  > div {
    padding: 15px 15px 15px 0px;
    width: 50%;
  }
  > div > div {
    padding: 18px;
  }
`;

export default HomesLoadingBody;
