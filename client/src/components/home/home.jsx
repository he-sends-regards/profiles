import React from 'react';
import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';

const Home = () => {
  const authStatus = AuthorizationStatus.NO_AUTH;

  return (
    <div className="home">
      <Link to='/auth'>
        {
          authStatus === AuthorizationStatus.AUTH ?
          'My account' :
          'Login/Register'
        }
      </Link>
    </div>
  );
};

export default Home;
