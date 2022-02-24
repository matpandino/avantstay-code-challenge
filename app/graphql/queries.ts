import { gql } from "@apollo/client";

export const QUERY_HOMES = gql`
  query HomesQuery(
    $page: Int!
    $pageSize: Int!
    $guests: Int!
    $order: HomesOrder
    $region: UUID
    $checkIn: ISODate!
    $checkOut: ISODate!
  ) {
    homes(
      page: $page
      pageSize: $pageSize
      guests: $guests
      order: $order
      region: $region
      period: { checkIn: $checkIn, checkOut: $checkOut }
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
  query homes(
    $ids: [UUID]!
    $checkIn: ISODate!
    $checkOut: ISODate!
    $coupon: String
  ) {
    homesPricing(
      ids: $ids
      coupon: $coupon
      period: { checkIn: $checkIn, checkOut: $checkOut }
    ) {
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
