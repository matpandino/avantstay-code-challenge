import styled from "styled-components";

export const HeaderContainer = styled.div`
  height: 128px;
  background: #ffffff;
  padding: 14px;
  box-shadow: 4px 8px 40px rgba(227, 230, 234, 0.3);
  position: sticky;
  top: 0;
  z-index: 10;
`;

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

export const Filters = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin: 14px 80px 0px 80px;
  height: 50px;
`;

export const FiltersHome = styled.div`
  flex: 1;
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  height: 50px;
`;

export const ContainerWebHeaderNonAuth = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin: 0px 80px 7px 80px;
  height: 36px;
`;

export const Divider = styled.div`
  margin: auto;
  background-color: #e8eff5;
  width: 2px;
  height: 30px;
`;

export const WrapFilters = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: 10;
`;

export const FiltersHomeBorder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  border: 1px solid #e8eff5;
  left: 0;
`;
