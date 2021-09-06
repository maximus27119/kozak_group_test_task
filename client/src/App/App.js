import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import MainPage from '../HomePage/MainPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import EmployeeForm from '../EmployeePages/EmployeeForm';


import { useDispatch } from 'react-redux';
import { authUser } from '../asyncActions/auth';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(authUser());
  }, []);

  return (
      <div className="App">
        <Router>
            <PrivateRoute exact path="/" component={MainPage} />
            <PrivateRoute exact path="/add_employee" component={EmployeeForm} operationType="add"/>
            <PrivateRoute exact path="/edit_employee/:id" component={EmployeeForm} operationType="edit"/>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
        </Router>
      </div>
  );
}

export default App;