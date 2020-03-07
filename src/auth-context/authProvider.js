import React, { createContext, useReducer, useState, useEffect } from "react";
import authReducer from "./authReducer";
import { CREATE_USER, LOGIN_USER, GET_ALL_BUSINESS, GET_ERRORS } from "./types";
import axios from "axios";

export const authContext = createContext();

const initialState = {
  user: "",
  business: [],
  auth_errors: "",
  isAuthenticated : false
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {      
    const auth = localStorage['auth'] ? JSON.parse(localStorage['auth']) : false;
    initialState.isAuthenticated = auth.token;
  }, [])

  const addUsers = async (user, history) => {
    try {
      const response = await axios.post(
        `/api/v1/auth/signup`,
        user
      );
      history.push("/success");
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
        `/api/v1/auth/login`,
        user
      ).then((response)=>{
        localStorage.setItem("auth", JSON.stringify(response.data))
        dispatch({
          type: LOGIN_USER,
          payload: response.data
        });
        history.push('/Dashboard')
      })
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  };

  const getAllBusiness = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const AuthStr = `Bearer ${auth.token}`;
      console.log(AuthStr);

      const response = await axios(`/api/v1/business`, {
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

  useEffect(() => {
    getAllBusiness();
  }, []);

  return (
    <authContext.Provider
      value={{
        addUsers,
        loginUsers,
        dispatchRed : dispatch,
        getAllBusiness,
        business: state.business,
        user: state.user,
        success_msg: state.success_msg,
        auth_errors: state.auth_errors,
        isAuthenticated : state.isAuthenticated,
        errorMsg
      }}
    >
      {children}
    </authContext.Provider>
  );
};
