import {
  RESERVATIONS_REQUEST,
  RESERVATIONS_SUCCESS,
  RESERVATIONS_FAILURE,
} from "../actions";

const initialState = {
  content: [],
  loading: false,
  error: null,
};

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESERVATIONS_REQUEST:
      return { ...state, loading: true, error: null };

    case RESERVATIONS_SUCCESS:
      return { ...state, loading: false, content: action.payload };

    case RESERVATIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default reservationsReducer;
