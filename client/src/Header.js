import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

const Header = () => {
  return (
    <HeaderContainer>
      <LogoLink to={"/"}>
        <div>This is the Logo</div>
      </LogoLink>
      <div>
        <LoginButton />
        <LogoutButton />
        <ProfileLink to={"/profile"}>
          <button>Profile</button>
        </ProfileLink>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;
const ProfileLink = styled(Link)``;
export default Header;
