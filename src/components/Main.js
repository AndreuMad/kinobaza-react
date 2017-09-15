import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './common/Header';
import PostsPage from './posts/PostsPage';
import Post from './posts/Post';
import TitlesPage from './titles/TitlesPage';

const Main = () => {
    return (
        <div>
            <Header />
            <main className="main-content">
                <Switch>
                    <Route exact path='/' component={() => <div>Main Page</div>} />
                    <Route exact path='/posts' component={PostsPage} />
                    <Route path='/posts/:id' component={Post} />
                    <Route path='/titles' component={TitlesPage} />
                </Switch>
            </main>
        </div>
    )
};

export default Main;
