import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./SearchBar";

const Header = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <HeaderContainer>
      <LogoLink to={"/homepage"}>
        <Logo src="/asset/logo/gasGuzzler2.PNG" />
      </LogoLink>
      <div>
        <SearchBar />
      </div>

      <div>
        <LoginButton />
        <LogoutButton />
        {isAuthenticated && (
          <ProfileLink to={"/profile"}>
            <ProfileButton>Profile</ProfileButton>
          </ProfileLink>
        )}
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #00515c;
  height: 58px;
`;
const Logo = styled.img`
  width: 150px;
  height: 150px;
  position: absolute;
  top: -46px;
  left: 17px;
`;
const LogoLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;
const ProfileLink = styled(Link)``;

const ProfileButton = styled.button`
  border: none;
  border-radius: 5px;

  background: #92b5bf;
  color: #161b21;
  text-decoration: none;
  font-size: 1rem;
  height: 2.3rem;
  margin-right: 20px;
  margin-left: 20px;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  padding: 0 20px;
  &:hover {
    background-color: #ffffff;
    color: #00515c;
  }
`;
export default Header;
