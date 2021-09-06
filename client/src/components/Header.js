import React from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Search from './Search';
import { useDispatch } from 'react-redux';
import { logout } from '../asyncActions/auth';

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

    const dispatch = useDispatch();

    const handleAdd = () => {
        history.push(`/add_employee`);
    };

    const handleLogout = () => {
        dispatch(logout());
    }

  return (
    <div className={classes.header}>
        <Button onClick={handleAdd} variant="outlined" color='primary' startIcon={<PersonAddIcon/>} disableElevation>Add employee</Button>
        <Search/>
        <Button onClick={handleLogout} variant='outlined' color='secondary' startIcon={<ExitToAppIcon/>} disableElevation>Logout</Button>
    </div>
  );
}

export default Header;