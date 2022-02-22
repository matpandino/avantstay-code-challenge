import {
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { format } from "date-fns";
import { HomeQueryResponse } from "../types";
import {
  ApolloError,
  LazyQueryResult,
  OperationVariables,
  QueryLazyOptions,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import {
  QUERY_HOMES,
  QUERY_HOMES_PRICING,
  QUERY_REGIONS,
} from "../graphql/queries";

interface IContextProps {
  homesData: Partial<HomeQueryResponse>;
  regionsData: any;
  loading: boolean;
  pricesLoading: boolean;
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
  error: ApolloError | undefined;
  getHomesData: (
    options?: QueryLazyOptions<OperationVariables> | undefined
  ) => Promise<LazyQueryResult<any, OperationVariables>>;
  loadNextPage: () => Promise<void>;
}
type IFilters = {
  order: string;
  guests: number;
  region: string | null;
  period: {
    checkIn: null | Date;
    checkOut: null | Date;
  };
};

const PAGE_SIZE = 10;

const HomeContext = createContext({} as IContextProps);

const HomesProvider: React.FC = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<IFilters>({
    order: "RELEVANCE",
    guests: 2,
    region: null,
    period: { checkIn: null, checkOut: null },
  });

  const [getHomesData, { loading, error, data, fetchMore }] =
    useLazyQuery(QUERY_HOMES);

  const [
    getHomesPrice,
    {
      loading: pricesLoading,
      error: pricesError,
      data: pricesData,
      fetchMore: fetchMorePrices,
    },
  ] = useLazyQuery(QUERY_HOMES_PRICING);

  const { data: regionsData } = useQuery(QUERY_REGIONS);

  const [parsedHomesData, setParsedHomesData] = useState(data);

  const newHomesData = () => {
    if (!data?.homes?.results) return;
    const parsedHomeData = data.homes.results.map((h: any) => {
      const homePriceData = pricesData?.homesPricing.find(
        (p: any) => p.homeId === h.id
      );
      console.log("AAA");
      if (!!homePriceData && h.id === homePriceData.homeId) {
        console.log("BBB", homePriceData);
        return { ...h, homePriceData };
      } else {
        return h;
      }
    });
    setParsedHomesData(parsedHomeData);

    console.log("parsedHomesData", parsedHomesData);
  };

  const searchHomes = () => {
    const { guests, order, region, period } = filters;
    getHomesData({
      variables: {
        page: 1,
        pageSize: PAGE_SIZE,
        guests: guests,
        order: order,
        region: region || null,
      },
    });
    if (period.checkIn && period.checkOut && !!data?.homes?.results) {
      console.log(
        "data.homes.results",
        data.homes.results.map((h: any) => h.id)
      );
      getHomesPrice({
        variables: {
          ids: data.homes.results.map((h: any) => h.id),
          page: 1,
          pageSize: PAGE_SIZE,
          guests: guests,
          order: order,
          checkIn: format(period.checkIn, "yyyy-MM-dd"),
          checkOut: format(period.checkOut, "yyyy-MM-dd"),
        },
      });
    }
  };
  useEffect(() => {
    searchHomes();
  }, [filters]);

  useEffect(() => {
    newHomesData();
  }, [data, pricesData]);

  useEffect(() => {
    searchHomes();
  }, []);

  const loadNextPage = async () => {
    await fetchMore({
      variables: { page: currentPage + 1, pageSize: PAGE_SIZE },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        console.log("prevResult", prevResult);
        return {
          homes: {
            results: [
              ...prevResult.homes.results,
              ...fetchMoreResult.homes.results,
            ],
            count: fetchMoreResult.homes.count,
          },
        };
      },
    });
    setCurrentPage(currentPage + 1);
  };
  console.log("pricesError", { pricesError });
  console.log("pricesData", { pricesData });
  return (
    <HomeContext.Provider
      value={{
        homesData: data,
        regionsData,
        loading,
        error,
        filters,
        pricesLoading,
        setFilters,
        getHomesData,
        loadNextPage,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export function useHomes() {
  const context = useContext(HomeContext);
  if (!context) throw new Error("useHomes must be used within a HomesProvider");
  const {
    homesData,
    regionsData,
    filters,
    pricesLoading,
    setFilters,
    loading,
    error,
    getHomesData,
    loadNextPage,
  } = context;
  return {
    homesData,
    regionsData,
    filters,
    pricesLoading,
    setFilters,
    loading,
    error,
    getHomesData,
    loadNextPage,
  };
}

export default HomesProvider;
