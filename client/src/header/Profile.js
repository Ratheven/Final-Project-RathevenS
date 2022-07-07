import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <Container>
        <Wrapper>
        

        <Img src={user.picture} alt={user.name} />
       
        <Key><Value>Name: </Value>{user.name}</Key>
        <Key><Value>Email: </Value>{user.email}</Key>
        <Key><Value>Nickname: </Value>{user.nickname}</Key>
        </Wrapper>
      </Container>
    )
  );
};
const Value = styled.span`
font-weight: bold;

`
const Key = styled.p`
margin-top: 5px;
`
const Img = styled.img`
margin-left: 25%;
`
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 100px;
`
const Wrapper = styled.div`
border: 1px solid black;
padding: 15px;
`
export default Profile;