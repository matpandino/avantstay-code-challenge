import React from "react";
import { HomeQueryResponse } from "../../../types";
import useHomes from "../../../contexts/HomesContext/useHomes";
import { Container, LoadingMore } from "./styles";
import HomeResultItem from "./HomeResultItem";
import HomesNoResults from "./HomesNoResults";
import InfiniteScroll from "react-infinite-scroller";

const HomesResultsBody: React.FC = () => {
  const { homesData, loadNextPage, loading, pricesLoading } = useHomes();
  const { homes } = homesData as HomeQueryResponse;
  const hasMoreHomes = homes?.count > homes?.results.length + 1 && !loading;

  if (homes.count === 0) {
    return <HomesNoResults />;
  }

  return (
    <Container>
      <InfiniteScroll
        pageStart={1}
        loadMore={(pageNumber) => loadNextPage(pageNumber)}
        hasMore={hasMoreHomes}
        loader={
          <LoadingMore key={0}>
            <span>Loading more homes...</span>
          </LoadingMore>
        }
      >
        {homes.results.map((home) => (
          <HomeResultItem
            key={home.id}
            data={home}
            loadingPrices={pricesLoading}
          />
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default HomesResultsBody;
