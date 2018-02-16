import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import Routes from 'Components/Routes';
import rootReducer from './reducers';
import rootSaga from 'Sagas';

import { authTokenRequest } from 'Ducks/auth';

const sagaMiddleware = createSagaMiddleware();

// Creating history
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const store = createStore(
  rootReducer,
  applyMiddleware(
    logger,
    sagaMiddleware,
    routerMiddleware(history)
  )
);

sagaMiddleware.run(rootSaga);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch(authTokenRequest(token));
}

const App = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default App;
