import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Main from './components/Main';
import Posts from './components/Posts';
import Post from './components/Post';

const store = configureStore();

const Routes = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={Main}>
                <Route path='/posts' component={Posts} />
                <Route path='/posts/:id' component={Post} />
            </Route>
        </Router>
    </Provider>
);

export default Routes;
