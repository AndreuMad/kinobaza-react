if(module.hot) {
    module.hot.accept();
}

import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello';

import './public/scss/main.scss';

ReactDOM.render(
    <Hello />,
    document.getElementById('app')
);

