import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './auth-form.css';

const AUTH_TYPE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const AuthForm = () => {
  const [authType, setAuthType] = useState('');

  return (
    <div className="auth-form">
      <Link to='/' style={{textDecoration: 'none', fontSize: '60px'}}>
        <span>&#8592;</span>
      </Link>

      <div>
        <button
          onClick={() => setAuthType(AUTH_TYPE.LOGIN)}
          disabled={authType === AUTH_TYPE.LOGIN}
          style={{margin: '0 20px'}}
        >
          Login
        </button>
        <button
          onClick={() => setAuthType(AUTH_TYPE.REGISTER)}
          disabled={authType === AUTH_TYPE.REGISTER}
        >
          Register
        </button>
      </div>

      {
        authType === AUTH_TYPE.LOGIN && (
          <form action="">
            <h3>Login form</h3>

            <label htmlFor="email-field">Email:</label><br />
            <input type="email" id="email-field"/><br />

            <label htmlFor="password-field">Password:</label><br />
            <input type="password" id="password-field"/><br />
          </form>
        )
      }
      {
        authType === AUTH_TYPE.REGISTER && (
          <form action="">
            <h3>Registration form</h3>

            <label htmlFor="name-field">Name:</label><br />
            <input type="name" id="name-field"/><br />

            <label htmlFor="email-field">Email:</label><br />
            <input type="email" id="email-field"/><br />

            <label htmlFor="password-field">Password:</label><br />
            <input type="password" id="password-field"/><br />
          </form>
        )
      }
      <br />
      {
        authType && (
          <button type="submit" style={{textTransform: 'capitalize'}}>
            {authType}
          </button>
        )
      }
    </div>
  );
};

export default AuthForm;
