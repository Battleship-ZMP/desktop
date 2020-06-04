import {
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "../actions/types";

const initState = {
  error: null,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case SIGNOUT_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
