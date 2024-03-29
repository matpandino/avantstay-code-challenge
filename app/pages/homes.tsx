import { useEffect, useState } from "react";
import styled from "styled-components";
import HomesHeader from "../components/Homes/HomesHeader";
import HomesLoadingBody from "../components/Homes/HomesLoadingBody";
import HomesResultsBody from "../components/Homes/HomesResultsBody";
import { useHomes } from "../contexts/HomesContext";

const Homes = () => {
  const [loadingResults, setLoadingResults] = useState(true);
  const { homesData, loading, error, pricesLoading } = useHomes();

  useEffect(() => {
    setLoadingResults(true);
  }, []);

  useEffect(() => {
    setLoadingResults(loading);
  }, [loading]);

  if (error) return <p>error: {error.message}</p>;

  return (
    <Container>
      {pricesLoading && "pricesLoading"}
      <HomesHeader
        loading={loadingResults}
        homesCount={homesData?.homes?.count}
      />
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
  padding-top: 40px;
`;
export default Homes;
