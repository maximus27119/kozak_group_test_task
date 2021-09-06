import { GET_ERROR, CLEAR_ERROR } from './types';

export const returnError = (message) => {
  return {
    type: GET_ERROR,
    payload: message
  }
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  }
}