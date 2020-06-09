import { FETCHPROFILE_SUCCESS } from "../actions/types";

const initState = {};

export const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCHPROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
