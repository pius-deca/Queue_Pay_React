import React, { createContext, useReducer, useState, useEffect } from "react";
import authReducer from "./authReducer";
import {
  CREATE_USER,
  LOGIN_USER,
  GET_ALL_BUSINESS,
  ADD_WALLET,
  GET_ERRORS,
  GET_BUSINESS_ERROR,
  CASH_OUT,
  GET_ALL_WALLETS,
  GET_ANALYTICS,
  REG_BUSINESS,
  DELETE_WALLET
} from "./types";
import axios from "axios";

export const authContext = createContext();

const initialState = {
  user: "",
  business: [],
  businessRegMsg: "",
  wallets: [],
  check: "",
  analytics: "",
  cashoutMsg: "",
  errors: "",
  businessError: "",
  isAuthenticated: false
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const auth = localStorage["auth"]
      ? JSON.parse(localStorage["auth"])
      : false;
    initialState.isAuthenticated = auth.token;
    getAllBusiness();
  }, []);

  const addUsers = async (user, history) => {
    try {
      const response = await axios.post(`/api/v1/users/register`, user);
      history.push("/login");
      dispatch({
        type: CREATE_USER,
        payload: response.data.message
      });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  };

  const loginUsers = async (loginRequest, history) => {
    try {
      const response = await axios.post(`/api/v1/users/login`, loginRequest)        
      localStorage.setItem("auth", JSON.stringify(response.data));
      dispatch({
        type: LOGIN_USER,
        payload: response.data
      });        
      history.push("/dashboard");
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    }
  };

  const addBusiness = async business => {
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

  const addWallet = async walletRequest => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const AuthStr = `Bearer ${auth.token}`;
      const businessId = JSON.parse(localStorage.getItem("currentBusinessId"));
      await axios
        .post(`/api/v1/business/${businessId}/wallet`, walletRequest, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: AuthStr
          }
        })
        .then(res => {
          dispatch({
            type: ADD_WALLET,
            payload: res.data
          });
        });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  };

  const getAllWallets = (history, id) => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const AuthStr = `Bearer ${auth.token}`;
      axios
        .get(`/api/v1/business/${id}/wallets`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: AuthStr
          }
        })
        .then(res => {
          dispatch({
            type: GET_ALL_WALLETS,
            payload: res.data
          });
        })
        .then(_ => {
          history.push("/cashout");
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
      history.push("/analytics");
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

  const cashOut = async cashout => {
    try {
      const businessId = JSON.parse(localStorage.getItem("currentBusinessId"));
      const walletId = JSON.parse(localStorage.getItem("currentWalletId"));

      const auth = JSON.parse(localStorage.getItem("auth"));
      const AuthStr = `Bearer ${auth.token}`;

      const response = await axios.patch(
        `/api/v1/business/${businessId}/wallet/${walletId}/cashout`,
        cashout,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: AuthStr
          }
        }
      );
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

  const deleteWallet = async walletId => {
    if (
      window.confirm(
        `You are deleting wallet of id : ${walletId}, this cannot be undone...`
      )
    ) {
      const businessId = JSON.parse(localStorage.getItem("currentBusinessId"));
      const auth = JSON.parse(localStorage.getItem("auth"));
      const AuthStr = `Bearer ${auth.token}`;
      await axios.delete(`/api/v1/business/${businessId}/wallet/${walletId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: AuthStr
        }
      });
      dispatch({
        type: DELETE_WALLET,
        payload: walletId
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
        check: state.check,
        addWallet,
        dispatch: dispatch,
        getAllWallets,
        getAnalytics,
        deleteWallet,
        errors: state.errors,
        businessError: state.businessError,
        user: state.user,
        dispatchRed: dispatch,
        business: state.business,
        businessRegMsg: state.businessRegMsg,
        wallets: state.wallets,
        cashoutMsg: state.cashoutMsg,
        analytics: state.analytics,
        success_msg: state.success_msg,
        isAuthenticated: state.isAuthenticated
      }}
    >
      {children}
    </authContext.Provider>
  );
};
