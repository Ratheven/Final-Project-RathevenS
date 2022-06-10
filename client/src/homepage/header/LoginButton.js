import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log(user, "this is the user");

  return (
    <button onClick={() => loginWithRedirect()}>
      {user ? `Hey ${user.given_name} ` : "log in"}
    </button>
  );
};

export default LoginButton;
