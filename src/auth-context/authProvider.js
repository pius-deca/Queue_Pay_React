import React, { createContext, useReducer, useState } from "react";
import authReducer from "./authReducer";
import { CREATE_USER, LOGIN_USER, GET_ERRORS } from "./types";
import axios from "axios";

export const authContext = createContext();

const initialState = {
  success_msg: "",
  auth_errors: ""
};
export const AuthProvider = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [state, dispatch] = useReducer(authReducer, initialState);
  const addUsers = async (user, history) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/v1/auth/signup`,
        user
      );
      history.push("/success");
      dispatch({
        type: CREATE_USER,
        payload: response.data.message
      });
    } catch (error) {
      setErrorMsg(error.response.data)
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    }
  };

  const loginUsers = async (user, history) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/v1/auth/login`,
        user
      );
      history.push("/Dashboard");
      dispatch({
        type: LOGIN_USER,
        payload: response.data.message
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
        success_msg: state.success_msg,
        auth_errors: state.auth_errors,
        errorMsg
      }}
    >
      {children}
    </authContext.Provider>
  );
};
