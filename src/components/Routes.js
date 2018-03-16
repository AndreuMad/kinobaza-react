import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { dispatch } from 'redux';

import ProtectedRoute from 'Components/hoc/ProtectedRoute';
import UnauthorizedRoute from 'Components/hoc/UnauthorizedRoute';

import Header from 'Components/header/Header';
import LoginPage from 'Screens/Login';
import PostsPage from 'Screens/Posts';
import PostPage from 'Screens/Post';
import TitlesPage from 'Screens/Titles';
import PersonsPage from 'Screens/Persons';
import ReviewsPage from 'Screens/Reviews';
import ProfilePage from 'Screens/Profile';
import GridPage from 'Screens/Grid';

const Routes = () => (
  <div>
    <Header />
    <main className="main-content">
      <Switch>
        <Redirect exact from="/" to="/posts" />
        <Route path="/posts/:id" component={PostPage} />
        <Route path="/posts" component={PostsPage} />
        <Route path="/titles" component={TitlesPage} />
        <Route path="/persons" component={PersonsPage} />
        <Route path="/reviews" component={ReviewsPage} />
        <Route path="/grid" component={GridPage} />
        <UnauthorizedRoute path="/login" component={LoginPage} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
      </Switch>
    </main>
  </div>
);

export default Routes;
