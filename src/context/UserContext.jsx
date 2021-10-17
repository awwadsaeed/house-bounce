import React, { createContext, useState, useEffect } from "react";
import superagent from "superagent";
import base64 from "base-64";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";

export const userContext = createContext();
const baseURL = "http://localhost:5000";
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
    // console.log(user);
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
        .post(`${baseURL}/auth/signin`)
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
        .get(`${baseURL}/req/read`)
        .set("authorization", `Bearer ${token}`);
      return result.body.houses;
    } catch (e) {
      console.log(e.message);
    }
  };

  //--- sending sign up request to the back end ---//
  const signup = async (email, password, firstName, lastName, role) => {
    try {
      const userData = {
        email,
        password,
        firstName,
        lastName,
        role,
        houses: [],
      };
      const result = await superagent.post(`${baseURL}/auth/signup`, userData);
      console.log(result.body);
    } catch (e) {
      console.log(e.message);
    }
  };

  //--- creating the house request ---//
  const createHouseReq = async (
    type,
    address,
    description,
    price,
    negotiable
  ) => {
    const token = cookie.load("Auth");
    const data = {
        type,
        address,
        description,
        price,
        negotiable,
    };
    const result = await superagent
      .post(`${baseURL}/req/create`, data )
      .set("authorization", `Bearer ${token}`);
    console.log(result.body);
    setUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      houses: result.body.houses,
    });
  };
//----updating the price ----//
  const updatePrice = async(houseID,price)=>{
    const token = cookie.load("Auth");
    const newPrice = `${price} JD`;
    const data ={ houseID, newPrice }
    const result = await superagent
    .put(`${baseURL}/req/updatePrice`, data )
    .set("authorization", `Bearer ${token}`);
    setUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      houses: result.body.houses,
    });
  }



  //----delete request----//
  const deleteHouse = async (id,email)=>{
  
    const token = cookie.load("Auth");
    const data = {
      houseID:id,
      ownerEmail:email
    }
    const result = await superagent
    .delete(`${baseURL}/req/delete`, data )
    .set("authorization", `Bearer ${token}`);
    console.log(result.body);
    setUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      houses: result.body.houses,
    });
  }
  //--- creating the context state object ---//
  const state = {
    login,
    signup,
    createHouseReq,
    updatePrice,
    deleteHouse,
    user,
  };

  return (
    <userContext.Provider value={state}>{props.children}</userContext.Provider>
  );
}
