import { 
  deleteEmployee as deleteEmployeeAction,
  getEmployees 
} from "../actions/employeeActions";
import { clearError, returnError } from "../actions/errorActions";
import employeeService from "../services/EmployeeService";

export const fetchEmployees = (options) => async dispatch => {
  try{
    dispatch(clearError());
    const response = await employeeService.list(options);
    dispatch(getEmployees(response.data));
  }catch(e){
    if (e.response)
      dispatch(returnError(e.response.data.message));
    else if (e.request && e.request.response) {
      const responseObject = JSON.parse(e.request.response);
      dispatch(returnError(responseObject.message));
    }
  }
};

export const quickEmployeesSearch = (options) => async dispatch => {
  try{
    dispatch(clearError());
    const response = await employeeService.quickSearch(options);
    dispatch(getEmployees(response.data));
  }catch(e){
    if (e.response)
      dispatch(returnError(e.response.data.message));
    else if (e.request && e.request.response) {
      const responseObject = JSON.parse(e.request.response);
      dispatch(returnError(responseObject.message));
    }
  }
};

export const deleteEmployee = (id) => async dispatch => {
  try{
    dispatch(clearError());
    const response = await employeeService.removeById(id);
    dispatch(deleteEmployeeAction(id));
  }catch(e){
    if (e.response)
      dispatch(returnError(e.response.data.message));
    else if (e.request && e.request.response) {
      const responseObject = JSON.parse(e.request.response);
      dispatch(returnError(responseObject.message));
    }
  }
};