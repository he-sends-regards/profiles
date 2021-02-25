import React, {useState, createRef, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useHttp} from '../../hooks/http.hook';
import {ButtonGroup, Button} from 'react-bootstrap';
import {APIRoute} from '../../const';
import './auth-form.css';

const AuthorizationType = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const AuthForm = () => {
  const auth = useContext(AuthContext);

  const [authType, setAuthType] = useState('');
  const {request} = useHttp();

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const isAdminCheckboxRef = createRef();

  const handleSumbit = async (evt) => {
    evt.preventDefault();

    const authData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (authType === AuthorizationType.REGISTER) {
      authData.name = nameRef.current.value;
      authData.isAdmin = isAdminCheckboxRef.current.checked;
    }

    const data = await request(
        `${APIRoute.AUTH}/${authType}`,
        'POST',
        authData,
    );

    if (authType === AuthorizationType.LOGIN) {
      auth.login(
          data.token,
          data.userId,
          data.userName,
          data.userMail,
          data.isUserAdmin,
      );
    }

    if (authType === AuthorizationType.REGISTER && data.status !== 400) {
      alert('You have been registered!');
      setAuthType(AuthorizationType.LOGIN);
    }
  };

  return (
    <div className="auth-form">
      <ButtonGroup aria-label="Basic example"
        className="auth-form__auth-buttons"
      >
        <Button variant="primary"
          onClick={() => setAuthType(AuthorizationType.LOGIN)}
          disabled={authType === AuthorizationType.LOGIN}
        >
          Login
        </Button>
        <Button variant="primary"
          onClick={() => setAuthType(AuthorizationType.REGISTER)}
          disabled={authType === AuthorizationType.REGISTER}
        >
          Register
        </Button>
      </ButtonGroup>

      {
        authType && (
          <form onSubmit={handleSumbit}>
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
            {
              authType === AuthorizationType.REGISTER && (
                <>
                  <label
                    htmlFor="isAdmin"
                    className="auth-form__isAdmin-label"
                  >
              Are you an admin?
                  </label>
                  <input
                    type="checkbox"
                    name=""
                    id="isAdmin"
                    className="auth-form__isAdmin-checkbox"
                    ref={isAdminCheckboxRef}
                  />
                  <br />
                </>
              )
            }
            <br/>
            <Button
              className="auth-form__submit-btn capitalize"
              type="submit"
              variant="success"
            >
              {authType}
            </Button>
          </form>
        )
      }
    </div>
  );
};

export default AuthForm;
