import React, { createContext, useReducer, useState, useEffect } from "react";
import authReducer from "./authReducer";
import { CREATE_USER, LOGIN_USER, GET_ALL_BUSINESS, GET_ERRORS, GET_BUSINESS_ERROR, CASH_OUT, GET_ALL_WALLETS, GET_ANALYTICS, REG_BUSINESS } from "./types";
import axios from "axios";

export const authContext = createContext();

const initialState = {
  user: "",
  business: [],
  businessRegMsg: "",
  wallets: [],
  analytics: "",
  cashoutMsg: "",
  errors: "",
  businessError: "",
  isAuthenticated : false
};

export const AuthProvider = ({ children }) => { 
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {      
    const auth = localStorage['auth'] ? JSON.parse(localStorage['auth']) : false;
    initialState.isAuthenticated = auth.token;
    getAllBusiness();
  }, [])

  const addUsers = async (user, history) => {
    try {
      const response = await axios.post(
        `/api/v1/users/signup`,
        user
      );
      history.push("/");
      dispatch({
        type: CREATE_USER,
        payload: response.data.message
      });
    } catch (error) {
      setErrorMsg(error.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  };

  const loginUsers = async (user, history) => {
    try {
      const response = await axios.post(
        `/api/v1/users/login`,
        user
      );
        localStorage.setItem("auth", JSON.stringify(response.data))          
        history.push('/dashboard')
        dispatch({
          type: LOGIN_USER,
          payload: response.data
        });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  };

  const addBusiness = async (business) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const AuthStr = `Bearer ${auth.token}`;
      await axios.post(`/api/v1/business/register`, business, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: AuthStr
        }
      });      
      dispatch({
        type: REG_BUSINESS,
        payload: business
      });
    } catch (error) {
      dispatch({
        type: GET_BUSINESS_ERROR,
        payload: error.response
      });
    }
  };

  const getAllBusiness = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const AuthStr = `Bearer ${auth.token}`;
      const response = await axios.get(`/api/v1/business/all`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: AuthStr
        }
      });
      dispatch({
        type: GET_ALL_BUSINESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  };

  const getAllWallets = async (history,id) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const AuthStr = `Bearer ${auth.token}`;
      const response = await axios.get(`/api/v1/business/${id}/wallets`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: AuthStr
        }
      });              
      history.push('/cashout')
      dispatch({
        type: GET_ALL_WALLETS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  };

  const getAnalytics = async (history, id) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const AuthStr = `Bearer ${auth.token}`;
      const response = await axios.get(`/api/v1/business/${id}/analytics`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: AuthStr
        }
      });              
      history.push('/analytics')
      dispatch({
        type: GET_ANALYTICS,
        payload: response.data
      });
    } catch (error) { 
      dispatch({        
        type: GET_ERRORS,
        payload: error.response
      });      
    }
  };
  
  const cashOut = async (cashout) => {
    try {
      const businessId = JSON.parse(localStorage.getItem("currentBusinessId"));
      const walletId = JSON.parse(localStorage.getItem("currentWalletId"));     
      
      const auth = JSON.parse(localStorage.getItem("auth"));
      const AuthStr = `Bearer ${auth.token}`;
      
      const response = await axios.patch(`/api/v1/business/${businessId}/wallet/${walletId}/cashout`, cashout, {
        headers: {
          "Access-Control-Allow-Origin": "*",
           Authorization: AuthStr
        }
      });
      dispatch({
        type: CASH_OUT,
        payload: response.data.body.message
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  };

  return (
    <authContext.Provider
      value={{
        addUsers,
        loginUsers,
        addBusiness,
        getAllBusiness,
        cashOut,
        dispatch:dispatch,
        getAllWallets,
        getAnalytics,
        errorMsg,
        errors: state.errors,
        businessError: state.businessError,
        user: state.user,
        dispatchRed : dispatch,
        business: state.business,
        businessRegMsg: state.businessRegMsg,
        wallets: state.wallets,
        cashoutMsg: state.cashoutMsg,
        analytics: state.analytics,
        success_msg: state.success_msg,
        isAuthenticated : state.isAuthenticated
      }}
    >
      {children}
    </authContext.Provider>
  );

  
};
