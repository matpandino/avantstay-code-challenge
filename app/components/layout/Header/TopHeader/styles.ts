import styled from "styled-components";

export const SignButtonsContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  max-width: 200px;
`;

export const MenuItemsContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  max-width: 364px;
`;

export const ContainerTopHeader = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 7px;
  height: 36px;
`;

export const MobileLogo = styled.div`
  display: none;
  @media (max-width: 967px) {
    display: flex;
    margin-right: 20px;
  }
`;

export const DesktopLogo = styled.div`
  display: flex;
  @media (max-width: 967px) {
    display: none;
  }
`;
