import { useEffect, useState } from "react";
import styled from "styled-components";
import HomesTitle from "../../components/Homes/HomesTitle";
import HomesLoadingBody from "../../components/Homes/HomesLoadingBody";
import HomesResultsBody from "../../components/Homes/HomesResultsBody";
import useHomes from "../../contexts/HomesContext/useHomes";

const Homes = () => {
  const [loadingResults, setLoadingResults] = useState(true);
  const { homesData, loading } = useHomes();

  useEffect(() => {
    setLoadingResults(true);
  }, []);

  useEffect(() => {
    setLoadingResults(loading);
  }, [loading]);

  return (
    <Container>
      {homesData?.homes?.count !== 0 && (
        <HomesTitle
          loading={loadingResults}
          homesCount={homesData?.homes?.count}
        />
      )}
      {loadingResults && <HomesLoadingBody />}
      {!!homesData && <HomesResultsBody />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  height: 100%;
  flex: 1;
  margin: 0 auto;
  padding-top: 30px;
  @media (max-width: 860px) {
    max-width: 100%;
    padding: 30px;
  }
`;

export default Homes;
