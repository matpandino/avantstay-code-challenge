import { gql } from "@apollo/client";

export const QUERY_HOMES = gql`
  query homes(
    $page: Int!
    $pageSize: Int!
    $guests: Int!
    $order: HomesOrder
    $region: UUID
  ) {
    homes(
      page: $page
      pageSize: $pageSize
      guests: $guests
      order: $order
      region: $region
    ) {
      results {
        id
        title
        cityName
        regionName
        stateCode
        bedsCount
        roomsCount
        bathroomsCount
        maxOccupancy
        hasPool
        photos {
          url
          listOrder
        }
        seasonPricing {
          highSeason {
            minPrice
            maxPrice
          }
          lowSeason {
            minPrice
            maxPrice
          }
        }
      }
      count
    }
  }
`;

export const QUERY_HOMES_PRICING = gql`
  query homes($ids: [UUID]!, $checkIn: ISODate!, $checkOut: ISODate!) {
    homesPricing(
      ids: $ids
      period: { checkIn: $checkIn, checkOut: $checkOut }
    ) {
      homeId
      numberOfNights
      total
    }
  }
`;

export const QUERY_REGIONS = gql`
  query regions {
    regions {
      id
      name
      stateName
      stateCode
    }
  }
`;
