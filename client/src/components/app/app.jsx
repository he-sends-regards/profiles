import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AppRoute} from '../../const';
import {AuthContext} from '../../context/AuthContext';
import {useAuth} from '../../hooks/auth.hook';
import Account from '../account/account';
import AuthPage from '../auth-page/auth-page';
import './app.css';

const App = ({appData = null}) => {
  const {
    token, login, logout, userId, userName, userMail, isUserAdmin,
  } = appData || useAuth();
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
              isAuthenticated ? <Redirect to="/account" /> : <AuthPage />
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

App.propTypes = {
  appData: PropTypes.shape({
    login: PropTypes.func,
    logout: PropTypes.func,
    token: PropTypes.string,
    userId: PropTypes.string,
    userName: PropTypes.string,
    userMail: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isUserAdmin: PropTypes.bool,
  }),
};

export default App;
