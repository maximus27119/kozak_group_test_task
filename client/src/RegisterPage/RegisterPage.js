import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, Link, Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService';

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
}));

const RegisterPage = () => {
  const classes = useStyles();
  // create state variables for each input
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async e => {
        try{
            const result = await AuthService.registration(login, email, password);
            if(result.data.user){
              localStorage.setItem('user', result.data.user);
              localStorage.setItem('token', result.data.token);
              history.push('/');
          }
        }catch(e){
            console.log(e);
        }
  };

  return (
      <div>
      {localStorage.getItem('token') ? <Redirect to='/' /> : ''}
    <form className={classes.root}>
      <TextField
        label="Login"
        variant="outlined"
        required
        value={login}
        onChange={e => setLogin(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button variant="outlined" color="primary" onClick={handleRegister}>
          Sign Up
        </Button>
      </div>
      <div>
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </form>
    </div>
  );
};

export default RegisterPage; 