import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './common/Header';
import LoginPage from './auth/LoginPage';
import PostsPage from './posts/PostsPage';
import Post from './posts/Post';
import TitlesPage from './titles/TitlesPage';
//import PersonsPage from './persons/';

const Routes = () => {
    return (
        <div>
            <Header />
            <main className="main-content">
                <Switch>
                    <Route exact path='/' component={() => <div>Main Page</div>} />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/posts/:id' component={Post} />
                    <Route path='/posts' component={PostsPage} />
                    <Route path='/titles' component={TitlesPage} />
                    {/*<Route path='/persons' component={} />*/}
                </Switch>
            </main>
        </div>
    )
};

export default Routes;
