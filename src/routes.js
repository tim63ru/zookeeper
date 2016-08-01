import React, {Component} from 'react';
import {Route, IndexRedirect} from 'react-router';
import App from './components/App';
import AnimalsList from './components/AnimalsList'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';
import {isUserAuthenticated} from './utils/user';
import requireAuth from './components/AuthContent';

export const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRedirect to={isUserAuthenticated() ? 'list' : 'signin'} />
      <Route path='/list' component={requireAuth(AnimalsList)} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
    </Route>
    <Route path='*' component={NotFound} />
  </div>
);
