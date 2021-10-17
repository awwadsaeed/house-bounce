import React, { createContext, useState, useEffect } from "react";
import superagent from "superagent";
import base64 from "base-64";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";

export const userContext = createContext();
const baseURL = "http://localhost:5000/";
export default function UserContext(props) {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    houses: [],
  });

  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    console.log(user);
    console.log(loggedin);
  }, [loggedin]);

  //--- we validate token after recieving it from back end, save it in the coockies, get the houses of this user and set the user and logged in states ---//

  const validateToken = async (token) => {
    try {
      const userData = jwt.decode(token);
      if (userData) {
        cookie.save("Auth", token);
        const houses = await getHouses(token);
        setUser({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          houses: houses,
        });
        setLoggedin(true);
      }
    } catch (error) {
      cookie.save("Auth", null);
    }
  };


  //--- sending sign in request to back end ---//
  const login = async (email, password) => {
    try {
      const encodedString = base64.encode(`${email}:${password}`);
      const result = await superagent
        .post(`${baseURL}auth/signin`)
        .set("authorization", `Basic ${encodedString}`);
      validateToken(result.body.token);
    } catch (e) {
      console.log(e.message);
    }
  };

  //---- get houses (read request) to get the houses data at login or entry at website ---//
  const getHouses = async (token) => {
    try {
      const result = await superagent
        .get(`${baseURL}req/read`)
        .set("authorization", `Bearer ${token}`);
        return(result.body.houses);
    } catch (e) {
      console.log(e.message);
    }
  };

  const state = {
    login,
  };

  return (
    <userContext.Provider value={state}>{props.children}</userContext.Provider>
  );
}
