import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../asyncActions/auth';

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

const RegisterPage = () => {  
  const auth = useSelector(state => state.auth);
  const error = useSelector(state => state.error);

  const history = useHistory();
  if (auth.isAuthenticated)
    history.push('/');

  const classes = useStyles();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerUser(login, email, password));
  };

  return (
    <form onSubmit={handleRegister} className={classes.root}>
      <TextField
        label="Login"
        variant="outlined"
        type="login"
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
        <Button type="submit" variant="outlined" color="primary">
          Sign Up
        </Button>
      </div>
      <div>
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
      <div>
      { error.message ? <Typography className={classes.error}>{error.message}</Typography> : ""}
      </div>
    </form>
  );
};

export default RegisterPage;