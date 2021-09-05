import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { quickEmployeesSearch } from '../asyncActions/employees';


const Search = (props) => {
    const [searchRequest, setSearchRequest] = useState('');
    
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(quickEmployeesSearch(searchRequest));
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField variant="outlined" size="small" value={searchRequest} onChange={e => setSearchRequest(e.target.value)}/>
            <Button type="submit"><SearchIcon/></Button>            
        </form>
    )
}

export default Search;