import styled from "styled-components";
import Link from "next/link";

type NavLinkProps = {
  label: string;
  href: string;
};

const NavLink: React.FC<NavLinkProps> = ({
  label,
  href,
  children,
  ...props
}) => {
  const isActive = href.includes("homes") ? true : false;

  return (
    <Link href={href} passHref>
      <NavLinkContainer isActive={isActive} {...props}>
        {label}
        <div />
      </NavLinkContainer>
    </Link>
  );
};

const NavLinkContainer = styled.a<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  height: 28px;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? "#53c3d0" : "#022b54")};
  position: relative;
  div {
    position: absolute;
    width: 20px;
    margin-top: 34px;
    height: 1px;
    background-color: ${({ isActive }) =>
      isActive ? "#53c3d0" : "transparent"};
    border-radius: 12px;
  }
  :hover,
  :active {
    color: #53c3d0;
  }
`;

export default NavLink;
