import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
  return (
    <HeaderContainer>
      <Link exact to={"/"}>
        <div>This is the Logo</div>
      </Link>
      <div>
        
          <LoginButton/>
          <LogoutButton/>
       
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default Header;
