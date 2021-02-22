import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import AuthForm from '../auth-form/auth-form';
import Home from '../home/home';
import './app.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth" exact>
          <AuthForm />
        </Route>
        <Route path="/account" exact></Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
