if (module.hot) {
  module.hot.accept();
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import './public/scss/main.scss';

ReactDOM.render(
  App,
  document.getElementById('app')
);
