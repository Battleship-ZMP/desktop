import { LOGIN } from "../actions/types";

const initState = {};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default authReducer();
