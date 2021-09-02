import axios from 'axios';

const API_URL = process.env.NODE_ENV !== 'production' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api` : '/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((response) => { // By default, axios doesn't return response, when it comes with error code.
    return response;                           // this interceptor allows to read error response, which comes from server.
}, function (error) {
    return Promise.reject(error.response);
});

export default $api;