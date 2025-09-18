import { SET_ROOMS } from "../actions";

const initialState = {
  content: [],
};

const roomsReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};
export default roomsReducers;
