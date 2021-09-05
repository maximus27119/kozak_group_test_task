import { deleteEmployeeAction, getEmployeesAction, setEmployeesLoadingAction } from "../actions/employeeActions";
import employeeService from "../services/EmployeeService";

export const getEmployees = (options) => async dispatch => {
  try{
    dispatch(setEmployeesLoadingAction());
    const response = await employeeService.list(options);
    dispatch(getEmployeesAction(response.data));
    dispatch(setEmployeesLoadingAction());
  }catch(e){
    console.log(e);
  }
};

export const quickEmployeesSearch = (options) => async dispatch => {
  try{
    dispatch(setEmployeesLoadingAction());
    const response = await employeeService.quickSearch(options);
    dispatch(getEmployeesAction(response.data));
    dispatch(setEmployeesLoadingAction());
  }catch(e){
    console.log(e);
  }
};

export const deleteEmployee = (id) => async dispatch => {
  try{
    dispatch(setEmployeesLoadingAction());
    const response = await employeeService.removeById(id);
    dispatch(deleteEmployeeAction(id));
    dispatch(setEmployeesLoadingAction());
  }catch(e){
    console.log(e);
  }
};