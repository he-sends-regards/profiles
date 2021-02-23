import React, {useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

const Account = () => {
  const auth = useContext(AuthContext);
  if (!auth.isAuthenticated) {
    alert('You are not authenticated! :(');
    return <Redirect to="/auth" />;
  }

  return (
    <div className="account">
      <Link to='/' style={{textDecoration: 'none', fontSize: '60px'}}>
        <span>&#8592;</span>
      </Link>
    </div>
  );
};

export default Account;
