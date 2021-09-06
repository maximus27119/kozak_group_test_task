import { GET_ERROR, CLEAR_ERROR } from '../actions/types';

const initialState = {
  message: null
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERROR:
      return {
        message: action.payload
      };
    case CLEAR_ERROR:
      return {
        message: null,
      };
    default:
      return state;
  }
}

export default errorReducer;