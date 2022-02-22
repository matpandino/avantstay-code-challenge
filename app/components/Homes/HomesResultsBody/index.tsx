import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { HomeQueryResponse } from "../../../types";
import { useHomes } from "../../../contexts/HomesContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, LoadingMore } from "./styles";
import HomeResultItem from "./HomeResultItem";
import HomesNoResults from "./HomesNoResults";

const HomesResultsBody: React.FC = () => {
  const { homesData, loadNextPage } = useHomes();
  const { homes } = homesData as HomeQueryResponse;
  const hasMore = homes.count !== homes.results.length;

  if (homes.count === 0) {
    <HomesNoResults />;
  }

  return (
    <Container>
      <InfiniteScroll
        dataLength={homes.results.length}
        next={loadNextPage}
        hasMore={hasMore}
        scrollableTarget="content"
        loader={
          <LoadingMore>
            <span>Loading more homes...</span>
          </LoadingMore>
        }
      >
        {homes.results.map((home) => (
          <HomeResultItem key={home.id} data={home} />
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default HomesResultsBody;
