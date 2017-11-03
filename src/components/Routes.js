import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'Components/common/Header';
import LoginPage from 'Screens/Login';
import PostsPage from 'Screens/Posts';
import PostPage from 'Screens/Post';
import TitlesPage from 'Screens/Titles';
import PersonsPage from 'Screens/Persons';
import ReviewsPage from 'Screens/Reviews';

const Routes = () => {
    return (
        <div>
            <Header />
            <main className="main-content">
                <Switch>
                    <Route exact path='/' component={() => <div>Main Page</div>} />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/posts/:id' component={PostPage} />
                    <Route path='/posts' component={PostsPage} />
                    <Route path='/titles' component={TitlesPage} />
                    <Route path='/persons' component={PersonsPage} />
                    <Route path='/reviews' component={ReviewsPage} />
                </Switch>
            </main>
        </div>
    )
};

export default Routes;
