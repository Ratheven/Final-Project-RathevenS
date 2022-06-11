import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log(user, "this is the user");

  return (
    !isAuthenticated && (
      <LogIn onClick={() => loginWithRedirect()}>Log In</LogIn>
    )
  );
};
const LogIn = styled.button`
 height: 2.3rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
`;
export default LoginButton;
