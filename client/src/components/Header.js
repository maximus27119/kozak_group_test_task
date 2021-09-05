import React from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Search from './Search';
import authService from '../services/AuthService';

const useStyles = makeStyles((theme) => ( {
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));

const Header = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/add_employee`);
    };

    const handleLogout = () => {
        authService.logout();
        history.push('/');
    }

  return (
    <div className={classes.header}>
        <Button component={Link} to='/add_employee' variant="outlined" color='primary' startIcon={<PersonAddIcon/>} disableElevation>Add employee</Button>
        <Search/>
        <Button variant='outlined' color='secondary' disableElevation onClick={handleLogout}><ExitToAppIcon/>Logout</Button>
    </div>
  );
}

export default Header;