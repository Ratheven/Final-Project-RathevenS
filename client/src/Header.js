import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Link exact to={"/"}>
        <div>This is the Logo</div>
      </Link>
      <div>
        <Link to={"/login"}>
          <div>Login/signup</div>
        </Link>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default Header;
