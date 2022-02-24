import styled from "styled-components";

export const Filters = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
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

export const FiltersHomeBorder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  border: 1px solid #e8eff5;
  left: 0;
`;

export const Divider = styled.div`
  margin: auto;
  background-color: #e8eff5;
  width: 1px;
  height: 30px;
`;

export const Stack = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;
