import Image from "next/image";
import { Home } from "../../../types";
import { formatCurrency } from "../../../utils/formatCurrency";
import {
  ContainerHomeResult,
  ContainerImage,
  ContainerInfo,
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
import Skeleton from "react-loading-skeleton";

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
  total: number;
  numberOfNights: number;
};

const HomeResultItem: React.FC<HomeResultItemProps> = ({
  data: home,
  loadingPrices,
}) => {
  return (
    <ContainerHomeResult>
      <ContainerImage>
        <Image
          src={home.photos[0].url}
          alt={"Picture of the home"}
          objectFit="cover"
          quality={50}
          height={208}
          width={390}
        />
      </ContainerImage>
      <ContainerInfo>
        <SmallLocationText>
          {home.regionName} - {home.cityName}, {home.stateCode}
        </SmallLocationText>
        <TitleText>{home.title}</TitleText>
        <Arrangements data={home} />

        {loadingPrices ? (
          <div>
            <Skeleton height="17px" width="34%" borderRadius="2px" />
            <Skeleton height="28px" width="41%" borderRadius="2px" />
            <Skeleton height="17px" width="15%" borderRadius="2px" />
          </div>
        ) : !!home?.homePricing?.total ? (
          <TotalPricing
            total={home.homePricing.total}
            numberOfNights={home.homePricing.numberOfNights}
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

const TotalPricing: React.FC<PricingProps> = ({ total, numberOfNights }) => {
  return (
    <>
      <SeasonPricingContainer>
        <SmallText>Total - {numberOfNights} nights</SmallText>
        <PriceText>{formatCurrency(total)}</PriceText>
        <SmallText>per night</SmallText>
      </SeasonPricingContainer>
    </>
  );
};

export default HomeResultItem;
