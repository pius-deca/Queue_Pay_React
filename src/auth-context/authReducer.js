import { CREATE_USER, LOGIN_USER, GET_ERRORS, GET_BUSINESS_ERROR, REG_BUSINESS, GET_ALL_BUSINESS, CASH_OUT, GET_ALL_WALLETS, GET_ANALYTICS } from "./types";

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
    case REG_BUSINESS:
      return {
        ...state,
        business: [...state.business, action.payload]
      };
    case GET_ALL_BUSINESS:
      return {
        ...state,
        business: action.payload
      };
    case GET_ALL_WALLETS:
      return {
        ...state,
        wallets: action.payload
      };
    case GET_ANALYTICS:
      return {
        ...state,
        analytics: action.payload
      }  
    case CASH_OUT:
      return {
        ...state,
        cashoutMsg: action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case 'REMOVE_ERROR':
      return {
        ...state,
        errors:"",
        cashoutMsg:"",
        businessError:""
      }
    case GET_BUSINESS_ERROR:
      return {
        ...state,
        businessError: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
