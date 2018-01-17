import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'Components/Routes';
import rootReducer from './reducers';
import rootSaga from 'Sagas';

import { authTokenRequest } from 'Ducks/auth';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch(authTokenRequest(token));
}

const App = (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);

export default App;
