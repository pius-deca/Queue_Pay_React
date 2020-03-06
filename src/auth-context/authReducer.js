import { CREATE_USER, LOGIN_USER, GET_ERRORS } from "./types";

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        success_msg: action.payload
      };
    case LOGIN_USER:
      return {
        ...state,
        success_msg: action.payload
    };  
    case GET_ERRORS:
      return {
        ...state,
        auth_errors: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
