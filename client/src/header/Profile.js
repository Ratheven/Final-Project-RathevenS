import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  //if autho0 is still loading it will produce the react Icon//
  if (isLoading) {
    return <CircularProgress />;
  }
  //grab user information from Auth0 and displaying it//
  return (
    isAuthenticated && (
      <>
        <WelcomeWrapper>
          <h1>Welcome {user.name}</h1>
        </WelcomeWrapper>
      <Container>
        <Wrapper>
          <Img src={user.picture} alt={user.name} />
          <Key>
            <Value>Name: </Value>
            {user.name}
          </Key>
          <Key>
            <Value>Email: </Value>
            {user.email}
          </Key>
          <Key>
            <Value>Nickname: </Value>
            {user.nickname}
          </Key>
        </Wrapper>
      </Container>
      </>
    )
  );
};
const WelcomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  font-size: 1.9rem;
`
const Value = styled.span`
  font-weight: bold;
`;
const Key = styled.p`
  margin-top: 5px;
`;
const Img = styled.img`
  margin-left: 25%;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  position: relative;
  top: 4px;
`;
const Wrapper = styled.div`
  border: 1px solid black;
  padding: 15px;
`;
export default Profile;
