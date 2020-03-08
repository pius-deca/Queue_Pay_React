import { CREATE_USER, LOGIN_USER, GET_ERRORS, GET_ALL_BUSINESS, CASH_OUT, GET_CASHOUT_ERRORS } from "./types";

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        token: action.payload
      };
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: ""
      };
    case GET_ALL_BUSINESS:
      return {
        ...state,
        business: action.payload
      };
    case CASH_OUT:
      return {
        ...state,
      };
    case GET_ERRORS:
      return {
        ...state,
        auth_errors: action.payload
      };
    case GET_CASHOUT_ERRORS:
      return {
        ...state,
        cashout_errors: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
