import { SIGNUP_ERROR, SIGNUP_SUCCESS } from "../actions/types";

const initState = {};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      console.log("reducer");
      return {
        ...state,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
