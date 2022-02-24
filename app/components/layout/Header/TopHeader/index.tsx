import Image from "next/image";
import {
  ContainerTopHeader,
  MenuItemsContainer,
  SignButtonsContainer,
  MobileLogo,
  DesktopLogo,
} from "./styles";
import logoTextImg from "../../../../assets/logo-text.svg";
import logo from "../../../../assets/logo.svg";
import NavLink from "../../../NavLink";
import { Button } from "../../../Button";

const TopHeader = () => (
  <ContainerTopHeader>
    <MobileLogo>
      <Image src={logo} alt="avantstay-logo" priority width={28} height={26} />
    </MobileLogo>
    <DesktopLogo>
      <Image
        src={logoTextImg}
        alt="avantstay-logo"
        priority
        width={160}
        height={16}
      />
    </DesktopLogo>

    <MenuItems />
    <SignButtons />
  </ContainerTopHeader>
);

const MenuItems = () => (
  <MenuItemsContainer>
    <NavLink label="Find Homes" href="/homes" />
    <NavLink label="Partners" href="#" />
    <NavLink label="Company Retreats" href="#" />
    <NavLink label="More" href="#" />
  </MenuItemsContainer>
);

const SignButtons = () => (
  <SignButtonsContainer>
    <Button label="Sign In" size="sm" />
    <Button label="Sign Up" size="sm" outlined />
  </SignButtonsContainer>
);

export default TopHeader;
