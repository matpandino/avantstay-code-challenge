import React from "react";
import styled from "styled-components";

const Stack: React.FC = ({ children }) => {
  return <StackContainer>{children}</StackContainer>;
};

const StackContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

export default Stack;
