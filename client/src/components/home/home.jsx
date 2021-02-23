import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';

const Home = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="home">
      {
        auth.isAuthenticated ? (
          <>
            <Link to='/account'>
              Account
            </Link>
            <br />
            <br />
            <button onClick={() => auth.logout()}>
              Logout
            </button>
          </>
        ) : (
          <Link to='/auth'>
            Login/Register
          </Link>
        )
      }
    </div>
  );
};

export default Home;
