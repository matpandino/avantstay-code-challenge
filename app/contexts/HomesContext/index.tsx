import { createContext, useState, Dispatch, SetStateAction } from "react";
import { HomeQueryResponse } from "../../types";
import { ApolloError, NetworkStatus, useQuery } from "@apollo/client";
import { QUERY_HOMES, QUERY_REGIONS } from "../../graphql/queries";

type IFilters = {
  order: string;
  guests: number | null;
  region: string | null;
  checkIn: string;
  checkOut: string;
  coupon: string;
};

interface IContextProps {
  homesData: Partial<HomeQueryResponse>;
  regionsData: any;
  loading: boolean;
  pricesLoading: boolean;
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
  error: ApolloError | undefined;
  loadNextPage: (pageNumber?: number) => void;
}

export const HomesContext = createContext({} as IContextProps);

const PAGE_SIZE = 10;

const HomesProvider: React.FC = ({ children }) => {
  const [filters, setFilters] = useState<IFilters>({
    order: "RELEVANCE",
    guests: 2,
    region: null,
    checkIn: "",
    checkOut: "",
    coupon: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data: regionsData } = useQuery(QUERY_REGIONS);

  const {
    data: homesData,
    loading: loadingHomes,
    error,
    fetchMore,
    networkStatus,
  } = useQuery(QUERY_HOMES, {
    variables: {
      order: filters.order,
      guests: filters.guests,
      region: filters.region,
      checkOut: filters.checkOut,
      checkIn: filters.checkIn,
      page: 1,
      pageSize: PAGE_SIZE,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMoreHomes = networkStatus === NetworkStatus.fetchMore;

  const loadNextPage = (pageNumber?: number) => {
    if (loadingHomes || loadingMoreHomes || !pageNumber) return;
    fetchMore({
      variables: {
        page: pageNumber,
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          homes: {
            results: [...prev.homes.results, ...fetchMoreResult.homes.results],
            count: fetchMoreResult.homes.count,
          },
        };
      },
    });
    setCurrentPage(currentPage + 1);
  };

  return (
    <HomesContext.Provider
      value={{
        homesData: homesData,
        regionsData,
        loading: loadingHomes,
        error,
        filters,
        pricesLoading: false,
        setFilters,
        loadNextPage,
      }}
    >
      {children}
    </HomesContext.Provider>
  );
};

export default HomesProvider;
