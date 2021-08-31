import React from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ( {
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));

export default function Header() {
    const classes = useStyles();

    const history = useHistory();

    const handleLogout = () => {
        AuthService.logout();
        history.push('/');
    }

  return (
    <div className={classes.header}>
        <Button component={Link} to='/add_employee' variant="contained" color='primary' startIcon={<PersonAddIcon/>} disableElevation>Add employee</Button>
        <Button variant='contained' color='secondary' disableElevation onClick={handleLogout}><ExitToAppIcon/>Logout</Button>
    </div>
  );
}