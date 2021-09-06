import {
  loginSuccess,
  loginFail,
  logoutSuccess,
  registerSuccess,
  registerFail,
  authSuccess,
} from '../actions/authActions';
import {
  clearError,
  returnError
} from '../actions/errorActions';
import authService from '../services/AuthService';

export const authUser = () => dispatch => {
  dispatch(clearError());
  if (localStorage.getItem('token')) {
    dispatch(authSuccess());
  }
}

export const loginUser = (login, password) => async dispatch => {
  try {
    dispatch(clearError());
    const response = await authService.login(login, password);
    if(response.data.token)
      localStorage.setItem('token',response.data.token);
    dispatch(loginSuccess(response.data));
  } catch (e) {
    if (e.response)
      dispatch(returnError(e.response.data.message));
    else if (e.request && e.request.response) {
      const responseObject = JSON.parse(e.request.response);
      dispatch(returnError(responseObject.message));
    }
    dispatch(loginFail());
  }
};

export const registerUser = (login, email, password) => async dispatch => {
  try {
    dispatch(clearError());
    const response = await authService.registration(login, email, password);
    if(response.data.token)
      localStorage.setItem('token',response.data.token);
    dispatch(registerSuccess(response.data));
  } catch (e) {
    if (e.response)
      dispatch(returnError(e.response.data.message));
    else if (e.request && e.request.response) {
      const responseObject = JSON.parse(e.request.response);
      dispatch(returnError(responseObject.message));
    }
    dispatch(registerFail());
  }
};

export const logout = () => dispatch => {
  dispatch(clearError());
  dispatch(logoutSuccess());
};