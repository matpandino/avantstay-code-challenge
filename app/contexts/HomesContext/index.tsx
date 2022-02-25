import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { HomeQueryResponse, RegionsQueryResponse } from "../../types";
import { ApolloError, NetworkStatus, useQuery } from "@apollo/client";
import { QUERY_HOMES, QUERY_REGIONS } from "../../graphql/queries";
import { useRouter } from "next/router";

type IFilters = {
  order: string;
  guests: number;
  region: string | null;
  regionName: string | null;
  checkIn: string;
  checkOut: string;
  coupon: string;
};

interface IContextProps {
  homesData: HomeQueryResponse | undefined;
  regionsData: RegionsQueryResponse | undefined;
  loading: boolean;
  pricesLoading: boolean;
  filters: IFilters;
  setFilters: Dispatch<SetStateAction<IFilters>>;
  error: ApolloError | undefined;
  loadNextPage: (pageNumber: number) => void;
}

export const HomesContext = createContext({} as IContextProps);

const HomesProvider: React.FC = ({ children }) => {
  const [filters, setFilters] = useState<IFilters>({
    order: "",
    guests: 0,
    region: null,
    regionName: "",
    checkIn: "",
    checkOut: "",
    coupon: "",
  });

  const { data: regionsData } = useQuery<RegionsQueryResponse>(QUERY_REGIONS);
  const router = useRouter();

  const {
    data: homesData,
    loading: loadingHomes,
    error,
    fetchMore,
    networkStatus,
  } = useQuery<HomeQueryResponse>(QUERY_HOMES, {
    variables: {
      order: filters.order || "RELEVANCE",
      guests: filters.guests,
      region: filters.region,
      checkOut: filters.checkOut,
      checkIn: filters.checkIn,
      page: 1,
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMoreHomes = networkStatus === NetworkStatus.fetchMore;

  const loadNextPage = (pageNumber: number) => {
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
  };

  // set region from the url to filters
  useEffect(() => {
    const { regionName: rName } = router.query;
    if (typeof rName !== "string") return;

    const regionName = decodeURIComponent(rName);
    if (regionName && !!regionsData?.regions) {
      const selectedRegion = regionsData.regions.find(
        ({ name }) => name === regionName
      );

      if (selectedRegion)
        setFilters({
          ...filters,
          regionName: selectedRegion.name,
          region: selectedRegion.id,
        });
    }
  }, [regionsData]);

  // change filters based on query parameters
  useEffect(() => {
    const { order, guests, checkIn, checkOut, coupon, regionName } =
      router.query;
    const filtersFromUrlQuery = {
      // ...(typeof region === "string" && { region }),
      ...(typeof regionName === "string" && { regionName }),
      ...(typeof order === "string" && { order }),
      ...(typeof guests === "string" && { guests: Number(guests) }),
      ...(typeof checkIn === "string" && { checkIn }),
      ...(typeof checkOut === "string" && { checkOut }),
      ...(typeof coupon === "string" && { coupon }),
    };

    const newFilters = {
      ...filters,
      ...filtersFromUrlQuery,
    };

    setFilters({ ...newFilters });
  }, [router.asPath]);

  useEffect(() => {
    let filtersObjectFiltered = Object.entries(filters).filter(
      ([key, val]) => !!val && key !== "regionName" && key !== "region"
    );

    const filtersStringParamsEncoded = filtersObjectFiltered
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    const pathRegionsRegionName =
      !!filters.regionName && filters.regionName !== "all";
    const path = pathRegionsRegionName
      ? `/regions/${filters.regionName}`
      : `/homes`;

    const parsedQParams = `${
      filtersObjectFiltered.length > 0 ? "?" : ""
    }${filtersStringParamsEncoded}`;
    // if (window) {
    //   window.history.pushState("", "", path + parsedQParams);
    // }
    router.push(path + parsedQParams, undefined, { shallow: true });
  }, [filters]);

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
