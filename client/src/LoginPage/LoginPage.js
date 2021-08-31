import React, { useState } from 'react';
import { useHistory, Link, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

const LoginPage = () => {
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async e => {
    const result = await AuthService.login(login, password);
    if(result.data.user){
        localStorage.setItem('user', result.data.user);
        localStorage.setItem('token', result.data.token);
        history.push('/');
    }
  };

  return (<div>
      
      {localStorage.getItem('token') ? <Redirect to='/' /> : ''}
  
    <form className={classes.root}>
      <TextField
        name="login"
        label="Login"
        variant="outlined"
        required
        value={login}
        onChange={e => setLogin(e.target.value)}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button variant="outlined" color="primary" onClick={handleLogin}>
          Sign In
        </Button>
      </div>
      <div>
          <p>Don't have account? <Link to="/register">Sign up</Link></p>
      </div>
    </form>
    </div>
  );
};

export default LoginPage; 