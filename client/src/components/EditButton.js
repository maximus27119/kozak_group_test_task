import React from 'react'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

const EditButton = (props) => {
    const id = props.id;

    return (
        <Link to={{pathname: `/edit_employee/${id}`, id}}>
            <Button color="primary"><EditIcon/></Button>
        </Link>
    )
}

export default EditButton;