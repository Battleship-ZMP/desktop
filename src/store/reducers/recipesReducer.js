import { FETCHRECIPES_START, FETCHRECIPES_SUCCESS } from "../actions/types";

const initState = {
  isLoading: false,
  error: null,
};

export const recipesReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCHRECIPES_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHRECIPES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
