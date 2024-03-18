import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  return (
    <UserContext.Provider
      value={{ user, token, userProfile, setUser, setToken, setUserProfile }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
