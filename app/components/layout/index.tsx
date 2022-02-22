import styled from "styled-components";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Content id="content">{children}</Content>
    </>
  );
};

const Content = styled.div`
  height: calc(100vh - 128px);
  overflow: auto;
`;

export default Layout;
