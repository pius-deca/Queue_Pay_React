import {
  CREATE_USER,
  LOGIN_USER,
  GET_ERRORS,
  ADD_WALLET,
  REG_BUSINESS,
  GET_ALL_BUSINESS,
  CASH_OUT,
  GET_ALL_WALLETS,
  GET_ANALYTICS,
  DELETE_WALLET,
  DELETE_BUSINESS
} from "./types";

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
    case "LOGOUT":
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
        wallets: action.payload,
      };
    case ADD_WALLET:
      return {
        ...state,
        wallets: [...state.wallets, action.payload]
      };
    case GET_ANALYTICS:
      return {
        ...state,
        analytics: action.payload
      };
    case CASH_OUT:
      return {
        ...state,
        cashoutMsg: action.payload
      };
    case DELETE_WALLET:
      return {
        ...state,
        check: "true",
        wallets: [
          ...state.wallets.filter(wallet => wallet.walletId !== action.payload)
        ]
      };
    case DELETE_BUSINESS:
      return {
        ...state,
        check: "true",
        business: [
          ...state.business.filter(item => item.businessId !== action.payload)
        ]
      };  
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case "REMOVE_ERROR":
      return {
        ...state,
        errors: "",
        cashoutMsg: ""
      };
    default:
      return state;
  }
};

export default reducer;
