import { GET_EMPLOYEES, DELETE_EMPLOYEE } from "./types";

export const getEmployees = employees => {
  return {
    type: GET_EMPLOYEES,
    payload: employees
  }
};

export const deleteEmployee = id => {
  return {
    type: DELETE_EMPLOYEE,
    payload: id
  }
};