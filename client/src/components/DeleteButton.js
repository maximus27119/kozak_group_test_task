import React from 'react';
import { Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { employeeService } from '../services/EmployeeService';

export const DeleteButton = (props) => {
    const id = props.id;

    const handleClick = () => {
        try{
            employeeService.removeById(id);
            window.location.reload();
        }catch(e){
            console.log(e);
        }
    };

    return (
        <Button color="secondary" onClick={handleClick}><DeleteForeverIcon/></Button>
    )
}

