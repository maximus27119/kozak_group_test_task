import {
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

export const authSuccess = () => {
  return {
    type: AUTH_SUCCESS,
  }
}

export const authError = () => {
  return {
    type: AUTH_ERROR
  }
}

export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}

export const loginFail = () => {
  return {
    type: LOGIN_FAIL
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const registerSuccess = (payload) => {
  return {
    type: REGISTER_SUCCESS,
    payload
  }
}

export const registerFail = () => {
  return {
    type: REGISTER_FAIL
  }
}