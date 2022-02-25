export type HomePhoto = {
  listOrder: number;
  url: string;
};

export type Home = {
  id: string;
  title: string;
  description: string;
  photos: HomePhoto[];
  roomsCount: number;
  bathroomsCount: number;
  bedsCount: number;
  maxOccupancy: number;
  hasPool: boolean;
  amenities: string[];
  seasonPricing: HomeSeasonPricing;
  homePricing?: HomesPricing;
  regionName: string;
  cityName: string;
  stateName: string;
  stateCode: string;
};

export type HomeSeasonPricing = {
  highSeason: PriceRange;
  lowSeason: PriceRange;
};

export type PriceRange = {
  homeId: string;
  minPrice: number;
  maxPrice: number;
};

export type HomeQueryResponse = { homes: { results: Home[]; count: number } };

export type HomesPricing = {
  numberOfNights: number;
  total: number;
};

export type HomesPricingQueryResponse = { homesPricing: HomesPricing[] };

export type Region = {
  id: string;
  name: string;
  stateName: string;
  stateCode: string;
};
export type RegionsQueryResponse = {
  regions: Region[];
};
