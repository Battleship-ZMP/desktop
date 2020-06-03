import {
  DELETEUSER_SUCCESS,
  FETCHRECIPES_START,
  FETCHRECIPES_SUCCESS,
} from "../actions/types";

const initState = {};

export const recipesReducer = (state = initState, action) => {
  switch (action.type) {
    case DELETEUSER_SUCCESS:
      return {
        ...state,
        data: null,
      };
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
