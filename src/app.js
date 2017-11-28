import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'Components/Routes';

import {signWithToken} from 'Actions/auth-actions';

const store = configureStore();

const token = localStorage.getItem('token');

if (token) {
    store.dispatch(signWithToken(token));
}

const App = (
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
);

export default App;
