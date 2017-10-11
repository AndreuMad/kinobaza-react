import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './common/Header';
import LoginPage from 'Components/auth/LoginPage';
import PostsPage from 'Components/posts/PostsPage';
import Post from 'Components/posts/Post';
import TitlesPage from 'Components/titles/TitlesPage';
import PersonsPage from 'Components/persons/PersonsPage';

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
                    <Route path='/persons' component={PersonsPage} />
                </Switch>
            </main>
        </div>
    )
};

export default Routes;
