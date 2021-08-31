import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { makeStyles, Typography } from '@material-ui/core';
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
  error: {
    fontWeight: 'bold',
    color: theme.palette.error.main
  }
}));

const LoginPage = () => {
  const history = useHistory();
  if (localStorage.getItem('token'))
    history.push('/');
  
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);


  const clearErrorMessage = () =>{
    setErrorMessage(null);
  }

  const handleLogin = async e => {
    try{
      clearErrorMessage();
      const result = await AuthService.login(login, password);
      if(result.data.user){
        localStorage.setItem('user', result.data.user);
        localStorage.setItem('token', result.data.token);
        history.push('/');
      }
    }catch(error){
      if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
      } else if (error.request && error.request.response) {
          const responseObject = JSON.parse(error.request.response);
          setErrorMessage(responseObject.message);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
    }
    
  };

  return (
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
      <div>
      { errorMessage ? <Typography className={classes.error}>{errorMessage}</Typography> : ""}
      </div>
    </form>
  );
};

export default LoginPage; 