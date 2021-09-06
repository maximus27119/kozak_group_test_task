import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import employeeReducer from './employeeReducer';

export default combineReducers({
    auth: authReducer,
    employee: employeeReducer,
    error: errorReducer,
});