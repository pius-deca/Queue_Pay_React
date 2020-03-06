import React, { createContext, useReducer, useState, useEffect } from "react";
import authReducer from "./authReducer";
import { CREATE_USER, LOGIN_USER, GET_ALL_BUSINESS, GET_ERRORS } from "./types";
import axios from "axios";

export const authContext = createContext();

const initialState = {
  user: "",
  business: [],
  auth_errors: ""
};
export const AuthProvider = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [state, dispatch] = useReducer(authReducer, initialState);
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
      );
      localStorage.setItem("auth", JSON.stringify(response.data.token));
      localStorage.setItem("fullName", response.data.fullName)
      localStorage.setItem("email", response.data.email)
      localStorage.setItem("phoneNumber", response.data.phoneNumber)
      history.push("/Dashboard");
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

  const getAllBusiness = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      const AuthStr = "Bearer ".concat(token);
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
        getAllBusiness,
        business: state.business,
        user: state.user,
        success_msg: state.success_msg,
        auth_errors: state.auth_errors,
        errorMsg
      }}
    >
      {children}
    </authContext.Provider>
  );
};
