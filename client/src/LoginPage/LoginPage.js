import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../asyncActions/auth';

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
  const auth = useSelector(state => state.auth);
  const error = useSelector(state => state.error);

  const history = useHistory();
  if (auth.isAuthenticated)
    history.push('/');
  
  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(loginUser(login, password));
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
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
        <Button type="submit" variant="outlined" color="primary">
          Sign In
        </Button>
      </div>
      <div>
          <p>Don't have account? <Link to="/register">Sign up</Link></p>
      </div>
      <div>
      { error.message ? <Typography className={classes.error}>{error.message}</Typography> : ""}
      </div>
    </form>
  );
};

export default LoginPage;