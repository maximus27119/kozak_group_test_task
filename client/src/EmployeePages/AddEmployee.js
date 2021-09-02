import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, makeStyles, Typography } from '@material-ui/core/';
import { Link, useHistory } from 'react-router-dom';
import employeeService from '../services/EmployeeService';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  errorMessage: {
    fontWeight: 'bold',
    color: theme.palette.error.main
  }
}));

const AddEmployee = () => {
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [contacts, setContacts] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);

    const classes = useStyles();
    const history = useHistory();

    const clearErrorMessage = () => {
        setErrorMessage(null);
    }

    const handleSubmit = async (e) =>{
        try{
            e.preventDefault();
            clearErrorMessage();

            const userObject = {fullname, gender, contacts, position, salary};        
            const response = await employeeService.insert(userObject);
            history.push('/');        
        }catch(e){
            setErrorMessage('Произошла ошибка');
        }
    }

    return(
        <form onSubmit={handleSubmit} className={classes.root}>
            <TextField
                name='fullname'
                label="Fullname"
                variant="outlined"
                required
                value={fullname}
                onChange={e => setFullname(e.target.value)}
                />
            <TextField
                name='gender'
                label="Gender"
                variant="outlined"
                required
                value={gender}
                onChange={e => setGender(e.target.value)}
            />
            <TextField
                name='contacts'
                label="Contacts"
                variant="outlined"
                required
                value={contacts}
                onChange={e => setContacts(e.target.value)}
            />
            <TextField
                name='position'
                label="Position"
                variant="outlined"
                required
                value={position}
                onChange={e => setPosition(e.target.value)}
            />
            <TextField
                name='salary'
                label="Salary"
                type="number"
                variant="outlined"
                required
                value={salary}
                onChange={e => {setSalary(+e.target.value)}}
            />
            <div>
                <Button variant="outlined" component={Link} to='/'><ClearIcon/>Cancel</Button>
                <Button variant="outlined" type="submit" color="primary"><SaveIcon/>Save</Button>
            </div>
            <div>
            { errorMessage ? <Typography className={classes.errorMessage}>{errorMessage}</Typography> : ""}
            </div>
        </form>
    );
};

export default AddEmployee;