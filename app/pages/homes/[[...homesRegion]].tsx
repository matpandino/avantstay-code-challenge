import { useEffect, useState } from "react";
import styled from "styled-components";
import HomesTitle from "../../components/Homes/HomesTitle";
import HomesLoadingBody from "../../components/Homes/HomesLoadingBody";
import HomesResultsBody from "../../components/Homes/HomesResultsBody";
import useHomes from "../../contexts/HomesContext/useHomes";
import { useRouter } from "next/router";

const Homes = () => {
  const router = useRouter();
  const [loadingResults, setLoadingResults] = useState(true);
  const { homesData, regionsData, loading, setFilters, filters } = useHomes();

  const { homesRegion } = router.query;
  const asPath = router.asPath;

  if (!!regionsData && !!homesRegion) {
    const { regions } = regionsData;
    if (typeof homesRegion === "string") {
      console.log("homesRegion", homesRegion);
    } else {
      const test = regions.find((r: any) => r.name === homesRegion[0]);
      if (!!test && filters.region !== test?.id) {
        console.log("achou test", !!test);
        setFilters({ ...filters, region: test.id });
      }
    }
  }

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
