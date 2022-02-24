import styled from "styled-components";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.div`
  @media (max-width: 480px) {
    width: max-content;
  }
`;
const Content = styled.div`
  margin-top: 128px;
  height: 100%;
  height: calc(100vh - 128px);
`;

export default Layout;
