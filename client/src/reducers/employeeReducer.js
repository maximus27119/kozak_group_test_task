import {
  GET_EMPLOYEES,
  DELETE_EMPLOYEE
} from '../actions/types';

const initialState = {
  employees: []
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(emp => emp._id !== action.payload)
      };
    default:
      return state;
  }
};

export default employeeReducer;