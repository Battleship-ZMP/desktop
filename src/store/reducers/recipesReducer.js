import { DELETEUSER_SUCCESS, FETCHRECIPES_SUCCESS } from "../actions/types";

const initState = {};

export const recipesReducer = (state = initState, action) => {
  switch (action.type) {
    case DELETEUSER_SUCCESS:
      return {
        ...state,
        data: null,
      };
    case FETCHRECIPES_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
