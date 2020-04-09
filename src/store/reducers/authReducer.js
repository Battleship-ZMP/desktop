import {
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
} from "../actions/types";

const initState = {};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
