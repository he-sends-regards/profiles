import React, {useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

const Account = () => {
  const auth = useContext(AuthContext);

  return auth.isAuthenticated ? (
    <div className="account">
      <Link to='/' className="auth-form__backward-link">
        <span>&#8592;</span>
      </Link>
    </div>
  ) : (
    <Redirect to="/auth" />
  );
};

export default Account;
