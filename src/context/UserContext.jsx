import React, { createContext, useState, useEffect } from "react";
import superagent from "superagent";
import base64 from "base-64";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";
import 'react-notifications/lib/notifications.css';

import {NotificationContainer,NotificationManager} from 'react-notifications';



export const userContext = createContext();
const baseURL = process.env.REACT_APP_API;
export default function UserContext(props) {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    houses: [],
  });

  const [loggedin, setLoggedin] = useState(false);
  const [chartStats, setChartStats] = useState({
    accepted: 0,
    regected: 0,
    pending: 0,
  });
  useEffect(() => {
    const token = cookie.load('Auth');
    validateToken(token);
  }, []);

  //--- we validate token after recieving it from back end, save it in the coockies, get the houses of this user and set the user and logged in states ---//

  const validateToken = async (token) => {
    try {
      const userData = jwt.decode(token);
      if (userData) {
        setUser({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
        });
        cookie.save("Auth", token);
        const result = await getHouses(token);
        setUser({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          houses: result.houses,
        });
        if(userData.role==='admin'){
          setChartStats(result.stats);
        }
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
  
      return result.body;
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
      return NotificationManager.info('A verification email has been sent to you, please verify your email to Login');
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
      .post(`${baseURL}/req/create`, data)
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
  const updatePrice = async (houseID, price) => {
    const token = cookie.load("Auth");
    const newPrice = `${price} JD`;
    const data = { houseID, newPrice };
    const result = await superagent
      .put(`${baseURL}/req/updatePrice`, data)
      .set("authorization", `Bearer ${token}`);
    setUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      houses: result.body.houses,
    });
  };

  //----delete request----//
  const deleteHouse = async (id, email) => {
    const token = cookie.load("Auth");
    const data = {
      houseID: id,
      ownerEmail: email,
    };
    const result = await superagent
      .delete(`${baseURL}/req/delete`, data)
      .set("authorization", `Bearer ${token}`);
    console.log(result.body);
    setUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      houses: result.body.houses,
    });
    setChartStats(result.body.stats);
  };

  //----update status request ---//
  const updateStatus = async (houseID, ownerEmail, stat) => {
    const token = cookie.load("Auth");
    const data = {
      houseID,
      ownerEmail,
      stat,
    };
    const result = await superagent
      .put(`${baseURL}/req/updateStatus`, data)
      .set("authorization", `Bearer ${token}`);
    setUser({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      houses: result.body.houses,
    });
    setChartStats(result.body.stats);
    console.log(result.body);
  };


  //----log out function ----//
  const logOut = ()=>{
    cookie.save('Auth',null);
    setUser({});
    setLoggedin(false);
  }



  //--- creating the context state object ---//
  const state = {
    login,
    signup,
    createHouseReq,
    updatePrice,
    deleteHouse,
    updateStatus,
    logOut,
    user,
    chartStats,
    loggedin
  };

  return (
    <userContext.Provider value={state}>{props.children}</userContext.Provider>
  );
}
