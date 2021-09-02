import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import MainPage from '../HomePage/MainPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AddEmployee from '../EmployeePages/AddEmployee';
import EditEmployee from '../EmployeePages/EditEmployee';

const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <PrivateRoute exact path="/" component={MainPage} />
          <PrivateRoute exact path="/add_employee" component={AddEmployee} />
          <PrivateRoute exact path="/edit_employee/:id" component={EditEmployee} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </div>
      </Router>
    </div>
  );
}

export default App;