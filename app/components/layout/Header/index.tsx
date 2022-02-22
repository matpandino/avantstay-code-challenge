import Image from "next/image";
import { Button } from "../../Button";
import NavLink from "../../NavLink";
import {
  HeaderContainer,
  ContainerWebHeaderNonAuth,
  FiltersHome,
  MenuItemsContainer,
  SignButtonsContainer,
  Filters,
  Divider,
  FiltersHomeBorder,
  WrapFilters,
} from "./styles";

import logoTextImg from "../../../assets/logo-text.svg";
import { InputField } from "../../InputField";
import Stack from "../../Stack";
import { useHomes } from "../../../contexts/HomesContext";
import SelectField from "../../SelectField";
import SelectCounterField from "../../SelectCounterField";
import SelectDateRangeField from "../../SelectDateRangeField";

const Header = () => {
  return (
    <HeaderContainer>
      <WebHeaderNonAuth />
      <FiltersFields />
    </HeaderContainer>
  );
};

const FiltersFields = () => {
  const { regionsData, filters, setFilters } = useHomes();

  const regionsOptions = regionsData?.regions.map((region: any) => ({
    label: `${region.name}, ${region.stateCode}`,
    value: region.id,
  }));

  const orderOptions = [
    { value: "RELEVANCE", label: "Relevance" },
    { value: "PRICE_ASC", label: "Price: lowest first" },
    { value: "PRICE_DESC", label: "Price: highest first" },
  ];

  return (
    <Filters>
      <FiltersHome>
        <FiltersHomeBorder />
        <WrapFilters>
          <Stack>
            <SelectField
              options={regionsOptions}
              label="Where"
              width="33%"
              placeholder="Select..."
              onChange={(value) => {
                console.log(value);
                setFilters({ ...filters, region: value });
              }}
            />
            <Divider />
            <SelectDateRangeField
              label="When"
              width="33%"
              placeholder="Select..."
              onChange={(value) => {
                console.log(value);
                setFilters({
                  ...filters,
                  period: {
                    checkIn: value.startDate,
                    checkOut: value.endDate,
                  },
                });
              }}
            />
            <Divider />
            <SelectCounterField
              label="Who"
              width="22%"
              counterText="Guests"
              placeholder="Select..."
              onChange={(value) => {
                console.log(value);
                setFilters({ ...filters, guests: value });
              }}
            />
            <Divider />
            <SelectField
              defaultValue={"RELEVANCE"}
              options={orderOptions}
              label="Order"
              width="22%"
              placeholder="Select..."
              onChange={(value) => {
                console.log(value);
                setFilters({ ...filters, order: value });
              }}
            />
          </Stack>
        </WrapFilters>
      </FiltersHome>
      <InputField
        label="Coupon"
        width="10%"
        placeholder="Got a code?"
        outlined
      />
    </Filters>
  );
};

const WebHeaderNonAuth = () => (
  <ContainerWebHeaderNonAuth>
    <Image
      src={logoTextImg}
      alt="avantstay-logo"
      width={159.63}
      height={15.37}
    />
    <MenuItems />
    <SignButtons />
  </ContainerWebHeaderNonAuth>
);

const MenuItems = () => (
  <MenuItemsContainer>
    <NavLink label="Find Homes" href="/homes" />
    <NavLink label="Partners" href="/#" />
    <NavLink label="Company Retreats" href="/#" />
    <NavLink label="More" href="/#" />
  </MenuItemsContainer>
);

const SignButtons = () => (
  <SignButtonsContainer>
    <Button label="Sign In" size="sm" />
    <Button label="Sign Up" size="sm" outlined />
  </SignButtonsContainer>
);

export default Header;
