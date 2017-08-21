if(module.hot) {
    module.hot.accept();
}

import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';

import './public/scss/main.scss';

ReactDOM.render(
    Router,
    document.getElementById('app')
);

