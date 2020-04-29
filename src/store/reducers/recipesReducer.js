import { FETCHRECIPES_SUCCESS } from "../actions/types";

const initState = {};

export const recipesReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCHRECIPES_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
