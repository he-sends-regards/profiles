import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {AppRoute} from '../../const';
import {AuthContext} from '../../context/AuthContext';
import {useAuth} from '../../hooks/auth.hook';
import Account from '../account/account';
import AuthForm from '../auth-form/auth-form';
import Home from '../home/home';
import './app.css';

const App = () => {
  const {
    token, login, logout, userId, userName, userMail, isUserAdmin,
  } = useAuth();
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{
      token,
      login,
      logout,
      userId,
      isAuthenticated,
      userName,
      userMail,
      isUserAdmin,
    }}>
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
    </AuthContext.Provider>
  );
};

export default App;
