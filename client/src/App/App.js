import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import MainPage from '../HomePage/MainPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AddEmployee from '../EmployeePages/AddEmployee';
import EditEmployee from '../EmployeePages/EditEmployee';


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
            <PrivateRoute exact path="/add_employee" component={AddEmployee} />
            <PrivateRoute exact path="/edit_employee/:id" component={EditEmployee} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
        </Router>
      </div>
  );
}

export default App;