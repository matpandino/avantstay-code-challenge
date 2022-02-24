import styled from "styled-components";
import FiltersFields from "./FilterFields";
import TopHeader from "./TopHeader";

const Header = () => {
  return (
    <HeaderContainer>
      <TopHeader />
      <FiltersFields />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 128px;
  background: #ffffff;
  box-shadow: 4px 8px 40px rgba(227, 230, 234, 0.3);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  min-width: 960px;
  padding: 14px 80px;
  @media (max-width: 967px) {
    min-width: auto;
    padding: 14px 30px;
  }
`;

export default Header;
