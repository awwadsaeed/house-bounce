import React, { createContext, useState } from "react";

export const userContext = createContext();

export default function UserContext(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
    houses: [],
  });

  const [login, setLogin] = useState(false);

  return <userContext.Provider>{props.children}</userContext.Provider>;
}
