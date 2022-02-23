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
import { ApolloError, useLazyQuery, useQuery } from "@apollo/client";
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
  loadNextPage: () => void;
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
  const [
    getHomes,
    { data: homesData, loading, error, fetchMore, refetch, client, called },
  ] = useLazyQuery(QUERY_HOMES, {
    onCompleted: (data) => handleHomesData(data),
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
  const [
    getHomesPrice,
    { loading: pricesLoading, error: pricesError, data: pricesData },
  ] = useLazyQuery(QUERY_HOMES_PRICING, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setParsedHomesData(homesData);
  }, [homesData]);

  useEffect(() => {
    getHomes({
      variables: {
        order: "RELEVANCE",
        guests: 2,
        region: null,
        checkIn: null,
        checkOut: null,
        page: 1,
        pageSize: PAGE_SIZE,
      },
    });
  }, []);

  useEffect(() => {
    getHomes({
      variables: {
        order: filters.order,
        guests: filters.guests,
        region: filters.region,
        page: 1,
        pageSize: PAGE_SIZE,
      },
    });
  }, [
    filters.region,
    filters.order,
    filters.guests,
    filters.checkIn,
    filters.checkOut,
  ]);

  const handleHomesData = async (data: any) => {
    console.log("called completed");
    setParsedHomesData(data);
    if (filters.checkIn && filters.checkOut) {
      console.log("call entrei handleHomesData filters");
      const homeIds = data?.homes?.results.map((h) => h.id);
      const resPrices = await getHomesPrice({
        variables: {
          ids: homeIds,
          checkIn: format(filters.checkIn, "yyyy-MM-dd"),
          checkOut: format(filters.checkOut, "yyyy-MM-dd"),
        },
      });
      const { homesPricing } = resPrices.data;
      const parsedNewResults = data.homes.results.map((h: any) => {
        const homesPricingData = homesPricing.find((hp) => hp.homeId === h.id);
        return { ...h, homePricing: { ...homesPricingData } };
      });
      const newValue = {
        homes: {
          results: [...parsedNewResults],
          count: data.homes.count,
        },
      };
      console.log("COM newValue", newValue);
      setParsedHomesData(newValue);
      return { ...newValue };
    }
  };

  const loadNextPage = () => {
    console.log("loadNextPage entrei");
    const nextPage = currentPage + 1;
    fetchMore({
      variables: {
        guests: filters.guests,
        region: filters.region,
        order: filters.order,
        page: nextPage,
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

    setCurrentPage(currentPage + 1);
  };

  return (
    <HomeContext.Provider
      value={{
        homesData: parsedHomesData,
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
    aa: () => console.log("cu"),
  };
}

export default HomesProvider;
