import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <NavLinkContainer pathName={router.pathname} {...props}>
        {label}
        <div />
      </NavLinkContainer>
    </Link>
  );
};

const NavLinkContainer = styled.a<{ pathName: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  height: 28px;
  text-decoration: none;
  color: ${(props) => (props.href === props.pathName ? "#53c3d0" : "#022b54")};
  div {
    width: 20px;
    margin-top: 8px;
    height: 1px;
    background-color: ${({ href, pathName }) =>
      href === pathName ? "#53c3d0" : "transparent"};
    border-radius: 12px;
  }
  :hover,
  :active {
    color: #53c3d0;
  }
`;

export default NavLink;
