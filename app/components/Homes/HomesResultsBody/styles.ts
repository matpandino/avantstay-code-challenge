import styled from "styled-components";

export const LoadingMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f7f7f7;
  border-radius: 2px;
  margin: auto;
  width: 182px;
  color: #b3b3b3;
  height: 30px;
`;

export const SeasonPricingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SeasonPricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  > span:first-child {
    margin-bottom: 4px;
  }
`;

export const PriceText = styled.span`
  display: flex;
  flex-wrap: nowrap;
  color: #022b54;
  font-weight: 600;
  font-size: 20px;
`;

export const TitleText = styled(PriceText)`
  font-family: "SangBleu Sunrise";
  font-weight: 700;
  margin-top: 8px;
  margin-bottom: 10px;
`;

export const SmallText = styled.span`
  display: flex;
  align-items: center;
  color: #022b54;
  font-weight: 400;
  font-size: 12px;
  opacity: 0.3;
`;

export const SmallLocationText = styled(SmallText)`
  color: #53c3d0;
  opacity: 1;
`;

export const ContainerInfo = styled.div`
  width: 50%;
  height: 208px;
  position: relative;
  padding: 15px;
`;
export const ContainerHomeResult = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 0px;
  width: 100%;
`;
export const ContainerImage = styled.div`
  width: 50%;
  height: 208px;
  position: relative;
  margin-right: 15px;
  img {
    border-radius: 2px;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  > div {
    width: 100%;
  }
`;

export const HomeDivider = styled.hr`
  border: none;
  border-top: 2px solid #f4f7fa;
  margin: 5px 0px;
`;
