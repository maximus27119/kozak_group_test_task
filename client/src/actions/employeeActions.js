import { GET_EMPLOYEES, DELETE_EMPLOYEE, EMPLOYEES_LOADING } from "./types";

export const getEmployeesAction = employees => {
  return {
    type: GET_EMPLOYEES,
    payload: employees
  }
};

export const deleteEmployeeAction = id => {
  return {
    type: DELETE_EMPLOYEE,
    payload: id
  }
};

export const setEmployeesLoadingAction = () => {
  return {
    type: EMPLOYEES_LOADING
  }
};