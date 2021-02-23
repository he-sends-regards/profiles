import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {AppRoute} from '../../const';
import Account from '../account/account';
import AuthForm from '../auth-form/auth-form';
import Home from '../home/home';
import './app.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={AppRoute.AUTH} exact>
          <AuthForm />
        </Route>
        <Route path={AppRoute.ACCOUNT} exact>
          <Account />
        </Route>
        <Route path={AppRoute.ROOT} exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
