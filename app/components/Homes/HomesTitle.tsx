import React from "react";
import styled from "styled-components";

interface LoadingHomesProps {
  loading: boolean;
  homesCount?: number;
}

const HomesTitle: React.FC<LoadingHomesProps> = ({ loading, homesCount }) => {
  return (
    <Container>
      <SmallText>
        <span>{loading ? "please wait" : "your stay in one of"}</span>
        <Line />
      </SmallText>
      <BigText>
        <span>{loading ? "Loading" : homesCount}</span> homes
      </BigText>
    </Container>
  );
};

const SmallText = styled.div`
  display: flex;
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  span {
    margin-right: 7px;
    color: #53c3d0;
    font-weight: 600;
    font-size: 9px;
  }
`;

const Line = styled.div`
  background-color: #53c3d0;
  height: 1px;
  width: 68px;
  font-weight: 600;
  font-size: 9px;
`;

const BigText = styled.div`
  color: #022b54;
  font-size: 28px;
  font-weight: 300;
  span {
    font-weight: 600;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`;
export default HomesTitle;
