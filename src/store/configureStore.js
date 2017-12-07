import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'Reducers';

import rootSaga from 'Sagas';

const sagaMiddleware = createSagaMiddleware();
sagaMiddleware.run(rootSaga);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
}
