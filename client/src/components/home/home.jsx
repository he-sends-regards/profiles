import React from 'react';
import {Link} from 'react-router-dom';

const AUTH_STATUS = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
};

const Home = () => {
  const authStatus = AUTH_STATUS.NO_AUTH;

  return (
    <div className="home">
      <Link to='/auth'>
        {
          authStatus === AUTH_STATUS.AUTH ?
          'My account' :
          'Login/Register'
        }
      </Link>
    </div>
  );
};

export default Home;
