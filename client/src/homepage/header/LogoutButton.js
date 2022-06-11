import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <LogOut onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </LogOut>
    )
  );
};
const LogOut = styled.button`
  height: 2.3rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
`;

export default LogoutButton;
