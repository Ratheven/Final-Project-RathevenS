import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  //if isAuthenticated is false the logIn button will appear
  return (
    !isAuthenticated && (
      <LogIn onClick={() => loginWithRedirect()}>Log In</LogIn>
    )
  );
};
const LogIn = styled.button`
  font-size: 1.2rem;
  height: 2.3rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
`;
export default LoginButton;
