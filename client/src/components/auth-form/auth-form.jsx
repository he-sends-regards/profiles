import React, {useState, createRef} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useHttp} from '../../hooks/http.hook';
import './auth-form.css';

const AuthorizationType = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const AuthForm = () => {
  const [authType, setAuthType] = useState('');
  const {request} = useHttp();

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();

  const handleSumbit = async (evt) => {
    evt.preventDefault();

    const authData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (authType === AuthorizationType.REGISTER) {
      authData.name = nameRef.current.value;
    }

    const data = await request(`/api/auth/${authType}`, 'POST', authData);

    console.log(data);
  };

  return (
    <div className="auth-form">
      <Link to={AppRoute.ROOT} className="auth-form__backward-link">
        <span>&#8592;</span>
      </Link>

      <div className="auth-form__auth-buttons">
        <button
          onClick={() => setAuthType(AuthorizationType.LOGIN)}
          disabled={authType === AuthorizationType.LOGIN}
        >
          Login
        </button>
        <button
          onClick={() => setAuthType(AuthorizationType.REGISTER)}
          disabled={authType === AuthorizationType.REGISTER}
        >
          Register
        </button>
      </div>

      {
        authType && (
          <form onSubmit={handleSumbit}>
            <h3 className="capitalize">{authType && (`${authType} form`)}</h3>

            {
              authType === AuthorizationType.REGISTER && (
                <>
                  <label htmlFor="name-field">Name:</label>
                  <br />
                  <input
                    minLength="2"
                    type="name"
                    id="name-field"
                    ref={nameRef}
                    required
                  />
                  <br />
                </>
              )
            }

            <label htmlFor="email-field">Email:</label>
            <br />
            <input type="email" id="email-field" ref={emailRef} required/>
            <br />

            <label htmlFor="password-field">Password:</label>
            <br />
            <input
              type="password"
              id="password-field"
              ref={passwordRef}
              minLength="6"
              maxLength="24"
              required
            />
            <br />
            <br />
            <button className="auth-form__submit-btn capitalize" type="submit">
              {authType}
            </button>
          </form>
        )
      }
    </div>
  );
};

export default AuthForm;
