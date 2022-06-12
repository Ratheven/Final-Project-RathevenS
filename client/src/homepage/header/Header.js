import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";


const Header = () => {
  return (
    <HeaderContainer>
      <LogoLink to={"/"}>
        <Logo>This is the Logo</Logo>
      </LogoLink>
      <div>
        <LoginButton />
        <LogoutButton />
        <ProfileLink to={"/profile"}>
          <ProfileButton>Profile</ProfileButton>
        </ProfileLink>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: darkblue;
`;
const Logo = styled.div`
  color: white;
  padding-top: 10px;
`;
const LogoLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;
const ProfileLink = styled(Link)``;

const ProfileButton = styled.button`
  border: none;
  border-radius: 5px;

  background: #626fe6;
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  height: 2.3rem;
  margin-right: 20px;
  margin-left: 20px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  padding: 0 20px;
  &:hover {
    background-color: #fff;
    color: #626fe6;
  }
`;
export default Header;
