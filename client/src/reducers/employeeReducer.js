import {
  GET_EMPLOYEES,
  DELETE_EMPLOYEE,
  EMPLOYEES_LOADING
} from '../actions/types';

const initialState = {
  employees: [],
  loading: false
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(emp => emp._id !== action.payload)
      };
    case EMPLOYEES_LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    default:
      return state;
  }
};

export default employeeReducer;