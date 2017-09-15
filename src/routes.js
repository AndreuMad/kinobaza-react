import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { BrowserRouter } from 'react-router-dom';

import Main from './components/Main';


const store = configureStore();

const Routes = (
    <Provider store={store}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </Provider>
);

export default Routes;
