import {
  createContext,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
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
  loadNextPage: () => Promise<void>;
}
type IFilters = {
  order: string;
  guests: number | null;
  region: string | null;
  checkIn: null | Date;
  checkOut: null | Date;
};
const PAGE_SIZE = 10;
const HomeContext = createContext({} as IContextProps);

const HomesProvider: React.FC = ({ children }) => {
  const [filters, setFilters] = useState<IFilters>({
    order: "RELEVANCE",
    guests: 2,
    region: null,
    checkIn: null,
    checkOut: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [parsedHomesData, setParsedHomesData] = useState<any>(null);

  const { data: regionsData } = useQuery(QUERY_REGIONS);
  const {
    data: homesData,
    loading,
    error,
    fetchMore,
    called,

    refetch,
    updateQuery,
  } = useQuery(QUERY_HOMES, {
    variables: {
      guests: filters.guests,
      region: filters.region,
      order: filters.order,
      page: currentPage,
      pageSize: PAGE_SIZE,
    },
  });
  const [
    getHomesPrice,
    { loading: pricesLoading, error: pricesError, data: pricesData },
  ] = useLazyQuery(QUERY_HOMES_PRICING);

  const updateCacheValues = async () => {
    await updateQuery(async (prevValue) => {
      console.log("call aaa", prevValue?.homes?.results);
      if (!!prevValue?.homes?.results === false) return prevValue;

      if (filters.checkIn && filters.checkOut) {
        const homeIds = prevValue?.homes?.results.map((h) => h.id);
        const resPrices = await getHomesPrice({
          variables: {
            ids: homeIds,
            checkIn: format(filters.checkIn, "yyyy-MM-dd"),
            checkOut: format(filters.checkOut, "yyyy-MM-dd"),
          },
        });
        console.log("call resPrices", resPrices);
        const { homesPricing } = resPrices.data;
        console.log("call homesPricing", homesPricing);
        const parsedNewResults = prevValue.homes.results.map((h: any) => {
          const homesPricingData = homesPricing.find(
            (hp) => hp.homeId === h.id
          );
          return { ...h, homePricing: { ...homesPricingData } };
        });
        const newValue = {
          homes: {
            results: [...parsedNewResults],
            count: prevValue.homes.count + 333,
          },
        };
        console.log("call newValue", newValue);
        return { ...newValue };
      } else {
        return {
          homes: {
            results: [...prevValue.homes.results],
            count: prevValue.homes.count + 333,
          },
        };
      }
    });
  };

  const loadNextPage = async () => {
    await fetchMore({
      variables: {
        guests: filters.guests,
        region: filters.region,
        order: filters.order,
        page: currentPage + 1,
        pageSize: PAGE_SIZE,
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
  };

  useEffect(() => {
    !!homesData && console.log("called", { homesData });
    // !!homesData && updateCacheValues();
  }, [homesData]);

  useEffect(() => {
    const load = async () => {
      const res = await refetch({
        guests: filters.guests,
        region: filters.region,
        order: filters.order,
        page: currentPage,
        pageSize: PAGE_SIZE,
      });
      console.log("call refetch res", res);
      await updateCacheValues();
    };
    load();
  }, [filters]);

  return (
    <HomeContext.Provider
      value={{
        homesData: homesData,
        regionsData,
        loading,
        error,
        filters,
        pricesLoading,
        setFilters,
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
    loadNextPage,
  };
}

export default HomesProvider;
