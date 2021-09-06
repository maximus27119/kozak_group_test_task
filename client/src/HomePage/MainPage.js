import React from 'react';
import Header from '../components/Header';
import EmployeeTable from '../components/EmployeeTable';

const MainPage = (props) => {
  
  return (
    <div>
      <Header/>
      <EmployeeTable/>
    </div>
  );
};

export default MainPage;