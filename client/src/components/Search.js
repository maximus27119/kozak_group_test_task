import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { Button, TextField } from '@material-ui/core';
import employeeService from '../services/EmployeeService';


const Search = (props) => {
    const [searchRequest, setSearchRequest] = useState('');
    const mainPage = props.mainPage;
    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            const response = await employeeService.quickSearch(searchRequest);
            console.log(response);
            if(!response){
                return;
            }
            mainPage.setState({employees : response.data});
        }catch(e){
            console.log(e);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField variant="outlined" size="small" value={searchRequest} onChange={e => setSearchRequest(e.target.value)}/>
            <Button type="submit"><SearchIcon/></Button>            
        </form>
    )
}

export default Search;