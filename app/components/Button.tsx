import styled from "styled-components";

interface ButtonProps {
  label: string;
  outlined?: boolean;
  size?: "sm" | "lg";
}

interface ButtonContainerProps {
  outlined?: boolean;
  colors: { default: string; hover: string; active: string };
}

export const Button: React.FC<
  ButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = ({ label, size, outlined = false, ...props }) => {
  const largeButtonColors = {
    default: "#53c3d0",
    hover: "#1c5d9f",
    active: "#022b54",
  };
  const smallButtonColors = {
    default: "#022B54",
    hover: "#53C3D0",
    active: "#34AEBC",
  };

  return (
    <ButtonContainer
      colors={size === "lg" ? largeButtonColors : smallButtonColors}
      outlined={outlined}
      {...props}
    >
      {label}
      <div />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  height: 36px;
  width: 100px;
  font-weight: 600;
  font-size: 14px;
  color: ${({ colors }) => colors.default};
  border-radius: 3px;
  border: ${({ outlined, colors }) =>
    outlined ? `2px solid ${colors.default}` : "2px solid transparent"};
  :hover {
    color: ${({ colors }) => colors.hover};
    border: ${({ outlined, colors }) =>
      outlined ? `2px solid ${colors.hover}` : "2px solid transparent"};
  }
  :active {
    color: ${({ colors }) => colors.active};
    border: ${({ outlined, colors }) =>
      outlined ? `2px solid ${colors.active}` : "2px solid transparent"};
  }
`;
