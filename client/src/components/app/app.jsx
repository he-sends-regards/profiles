import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {AppRoute} from '../../const';
import {AuthContext} from '../../context/AuthContext';
import {useAuth} from '../../hooks/auth.hook';
import Account from '../account/account';
import AuthForm from '../auth-form/auth-form';
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
            {
              isAuthenticated ? <Redirect to="/account" /> : <AuthForm />
            }
          </Route>
          <Route path={AppRoute.ACCOUNT} exact>
            {
              isAuthenticated ?
                <Account userData={{userName, isUserAdmin}} /> :
                <Redirect to="/auth" />
            }
          </Route>
          <Route path={AppRoute.ROOT} exact>
            {
              isAuthenticated ?
                <Redirect to="/account" /> :
                <Redirect to="/auth" />
            }
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
