import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { Provider } from 'react-redux';
import store from './store/store';
dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);