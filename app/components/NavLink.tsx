import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import chevronDown from "../assets/chevron_down.svg";

type NavLinkProps = {
  label: string;
  href: string;
  withArrow?: boolean;
};

const NavLink: React.FC<NavLinkProps> = ({
  label,
  href,
  children,
  withArrow = false,
  ...props
}) => {
  const isActive = label === "Find Homes";

  return (
    <Link href={href} passHref>
      <NavLinkContainer isActive={isActive} {...props}>
        <div>
          {label}
          {withArrow && (
            <Arrow>
              <Image src={chevronDown} width={12} height={12} />
            </Arrow>
          )}
        </div>
        {isActive && <ActiveLine />}
      </NavLinkContainer>
    </Link>
  );
};

const ActiveLine = styled.div`
  position: absolute;
  width: 20px;
  margin-top: 34px;
  height: 1px;
  background-color: #53c3d0;
  border-radius: 12px;
`;

const Arrow = styled.div`
  margin-left: 5px;
`;

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
    display: flex;
  }

  :hover,
  :active {
    color: #53c3d0;
  }
`;

export default NavLink;
