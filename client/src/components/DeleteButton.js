import React from 'react';
import { Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { employeeService } from '../services/EmployeeService';

export const DeleteButton = (props) => {
    const id = props.id;

    const handleClick = () => {
        employeeService.removeById(id);
        window.location.reload();
    };

    return (
        <Button color="secondary" onClick={handleClick}><DeleteForeverIcon/></Button>
    )
}

