import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

export const EditButton = (props) => {
    const id = props.id;

    return (
        <Link to={{pathname: `/edit_employee/${id}`, id}}>
            <Button color="primary"><EditIcon/></Button>
        </Link>
    )
}