import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, operationType, ...rest }) => {
    const auth = useSelector(state => state.auth);
    return (
    <Route {...rest} render={props => (
        auth.isAuthenticated
            ? <Component {...props} operationType={operationType} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)};

export default PrivateRoute;