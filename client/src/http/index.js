import axios from 'axios';

export const API_URL = process.env.NODE_ENV !== 'production' ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api` : '/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

$api.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(error.response);
});

export default $api;