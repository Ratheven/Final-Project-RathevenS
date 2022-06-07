import { createContext } from "react";


export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  return <UserContext.Provider>{children}</UserContext.Provider>;
};

export default UserProvider;
