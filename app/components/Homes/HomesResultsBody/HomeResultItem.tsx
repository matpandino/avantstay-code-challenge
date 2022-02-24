import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";

import { Home, HomesPricing } from "../../../types";
import { formatCurrency } from "../../../utils/formatCurrency";
import {
  ContainerHomeResult,
  ContainerImage,
  ContainerInfo,
  HomeDivider,
  PriceText,
  SeasonPricingContainer,
  SeasonPricingsContainer,
  SmallLocationText,
  SmallText,
  TitleText,
} from "./styles";

import BathIcon from "../../../assets/arrangmentsIcons/bath.svg";
import BedroomIcon from "../../../assets/arrangmentsIcons/rooms.svg";
import UserIcon from "../../../assets/arrangmentsIcons/user.svg";
import PoolIcon from "../../../assets/arrangmentsIcons/pool.svg";
import HighIcon from "../../../assets/high.svg";
import LowIcon from "../../../assets/low.svg";
import { QUERY_HOMES_PRICING } from "../../../graphql/queries";
import useHomes from "../../../contexts/HomesContext/useHomes";

type HomeResultItemProps = {
  data: Home;
  loadingPrices: boolean;
};

type ArrangementsProps = {
  data: Home;
};

type SeasonPricingProps = {
  type: "highSeason" | "lowSeason";
  minPrice: number;
  maxPrice: number;
};

type PricingProps = {
  coupon: string;
  homeId: string;
  checkIn: Date;
  checkOut: Date;
};

const HomeResultItem: React.FC<HomeResultItemProps> = ({ data: home }) => {
  const {
    filters: { checkIn, checkOut, coupon },
  } = useHomes();

  return (
    <>
      <ContainerHomeResult>
        <ContainerImage>
          <Image
            src={`${home.photos[0].url}?height=${208}&&width=${390}`}
            alt={"Picture of the home"}
            layout="fill"
            objectFit="cover"
            quality={50}
          />
        </ContainerImage>
        <ContainerInfo>
          <SmallLocationText>
            {home.regionName} - {home.cityName}, {home.stateCode}
          </SmallLocationText>
          <TitleText>{home.title}</TitleText>
          <Arrangements data={home} />

          {!!checkIn && !!checkOut ? (
            <TotalPricing
              homeId={home.id}
              checkIn={checkIn}
              checkOut={checkOut}
              coupon={coupon}
            />
          ) : (
            <SeasonPricingsContainer>
              <SeasonPricing
                type="lowSeason"
                minPrice={home.seasonPricing.lowSeason.minPrice}
                maxPrice={home.seasonPricing.lowSeason.maxPrice}
              />
              <SeasonPricing
                type="highSeason"
                minPrice={home.seasonPricing.highSeason.minPrice}
                maxPrice={home.seasonPricing.highSeason.maxPrice}
              />
            </SeasonPricingsContainer>
          )}
        </ContainerInfo>
      </ContainerHomeResult>
      <HomeDivider />
    </>
  );
};

const Arrangements: React.FC<ArrangementsProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 35 }}>
      <SmallText color="#53C3D0">
        <Image src={BedroomIcon} alt="Bedroom Icon" width={24} height={24} />
        {data.bedsCount} Bedrooms
      </SmallText>
      <SmallText>
        <Image src={BathIcon} alt="Bath Icon" width={24} height={24} />
        {data.bathroomsCount} Bathrooms
      </SmallText>
      {data.hasPool && (
        <SmallText>
          <Image src={PoolIcon} alt="Pool Icon" width={24} height={24} />
          Pool
        </SmallText>
      )}
      <SmallText>
        <Image src={UserIcon} alt="User Icon" width={24} height={24} />
        {data.maxOccupancy} Guests
      </SmallText>
    </div>
  );
};

const SeasonPricing: React.FC<SeasonPricingProps> = ({
  type,
  minPrice,
  maxPrice,
}) => {
  const isHighSeason = type === "highSeason";
  return (
    <>
      <SeasonPricingContainer>
        <SmallText>
          <Image
            src={isHighSeason ? HighIcon : LowIcon}
            alt={isHighSeason ? "Arrow Up Icon" : "Arrow Down Icon"}
            width={16}
            height={16}
          />
          {isHighSeason ? "Prime Season" : "Budget Season"}
        </SmallText>
        <PriceText>
          {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
        </PriceText>
        <SmallText>per night</SmallText>
      </SeasonPricingContainer>
    </>
  );
};

const LoadingPricing = () => (
  <div>
    <Skeleton height="17px" width="34%" borderRadius="2px" />
    <Skeleton height="28px" width="41%" borderRadius="2px" />
    <Skeleton height="17px" width="15%" borderRadius="2px" />
  </div>
);

const TotalPricing: React.FC<PricingProps> = ({
  homeId,
  checkIn,
  checkOut,
  coupon,
}) => {
  const { data: pricingData, loading: loadingPrices } = useQuery<{
    homesPricing: HomesPricing[];
  }>(QUERY_HOMES_PRICING, {
    variables: {
      ids: [homeId],
      coupon: coupon,
      checkIn: format(checkIn, "yyyy-MM-dd"),
      checkOut: format(checkOut, "yyyy-MM-dd"),
    },
  });

  if (loadingPrices || !pricingData) return <LoadingPricing />;

  const homesPricing = pricingData.homesPricing;
  const homesPricingData = homesPricing[0];

  return (
    <>
      <SeasonPricingContainer>
        <SmallText>Total - {homesPricingData.numberOfNights} nights</SmallText>
        <PriceText>{formatCurrency(homesPricingData.total)}</PriceText>
        <SmallText>
          {formatCurrency(
            homesPricingData.total / homesPricingData.numberOfNights
          )}{" "}
          per night
        </SmallText>
      </SeasonPricingContainer>
    </>
  );
};

export default HomeResultItem;
