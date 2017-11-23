import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'Components/common/Header';
import LoginPage from 'Screens/Login';
import PostsPage from 'Screens/Posts';
import PostPage from 'Screens/Post';
import TitlesPage from 'Screens/Titles';
import PersonsPage from 'Screens/Persons';
import ReviewsPage from 'Screens/Reviews';
import SettingsPage from 'Screens/Settings';

const Routes = () => (
    <div>
        <Header />
        <main className="main-content">
            <Switch>
                <Redirect exact from="/" to="/posts" />
                <Route path='/login' component={LoginPage} />
                <Route path='/posts/:id' component={PostPage} />
                <Route path='/posts' component={PostsPage} />
                <Route path='/titles' component={TitlesPage} />
                <Route path='/persons' component={PersonsPage} />
                <Route path='/reviews' component={ReviewsPage} />
                <Route path='/profile' component={SettingsPage} />
            </Switch>
        </main>
    </div>
);

export default Routes;
