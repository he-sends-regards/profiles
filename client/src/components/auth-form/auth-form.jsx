import React, {useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useHttp} from '../../hooks/http.hook';
import {ButtonGroup, Button} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {APIRoute} from '../../const';
import './auth-form.css';

const AuthorizationType = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const FieldsLengthParams = {
  name: {
    min: 2,
  },
  password: {
    min: 6,
    max: 24,
  },
};

const AuthForm = () => {
  const auth = useContext(AuthContext);

  const [authType, setAuthType] = useState('');
  const {request} = useHttp();
  const {register, handleSubmit, errors} = useForm();

  const onSubmit = async (authData) => {
    if (Object.keys.length === 0) {
      console.log(errors);
      return;
    }

    const responseData = await request(
        `${APIRoute.AUTH}/${authType}`,
        'POST',
        authData,
    );

    if (authType === AuthorizationType.LOGIN) {
      auth.login(
          responseData.token,
          responseData.userId,
          responseData.userName,
          responseData.userMail,
          responseData.isUserAdmin,
      );
    }

    if (authType === AuthorizationType.REGISTER &&
      responseData.status !== 400) {
      alert('You have been registered!');
      setAuthType(AuthorizationType.LOGIN);
    }
  };

  const onFormTypeBtnClick = (formType) => setAuthType(formType);

  return (
    <div className="auth-form">
      <ButtonGroup aria-label="Basic example"
        className="auth-form__auth-buttons"
      >
        <Button variant="primary"
          onClick={onFormTypeBtnClick(AuthorizationType.LOGIN)}
          disabled={authType === AuthorizationType.LOGIN}
        >
          Login
        </Button>
        <Button variant="primary"
          onClick={onFormTypeBtnClick(AuthorizationType.REGISTER)}
          disabled={authType === AuthorizationType.REGISTER}
        >
          Register
        </Button>
      </ButtonGroup>

      {
        authType && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              authType === AuthorizationType.REGISTER && (
                <>
                  <label htmlFor="name-field">Name:</label>
                  <br />
                  <input
                    type="name"
                    id="name-field"
                    name="name"
                    ref={register({
                      required: true,
                      minLength: FieldsLengthParams.name.min,
                    })}
                  />
                  {
                    errors.name &&
                    errors.name.type === 'required' &&
                      <span role="alert">This is required</span>
                  }
                  {
                    errors.name &&
                    errors.name.type === 'minLength' &&
                      <span role="alert">Min length exceeded</span>
                  }
                  <br />
                </>
              )
            }

            <label htmlFor="email-field">Email:</label>
            <br />
            <input
              type="email"
              id="email-field"
              name="email"
              ref={register({required: true})}
            />
            {
              errors.email &&
              errors.email.type === 'required' &&
                <span role="alert">This is required</span>
            }
            <br />

            <label htmlFor="password-field">Password:</label>
            <br />
            <input
              type="password"
              name="password"
              id="password-field"
              ref={register({
                required: true,
                minLength: FieldsLengthParams.password.min,
                maxLength: FieldsLengthParams.password.max,
              })}
            />
            {
              errors.password &&
              errors.password.type === 'required' &&
                <span role="alert">This is required</span>
            }
            {
              errors.password &&
              errors.password.type === 'minLength' &&
                <span role="alert">Min length exceeded</span>
            }
            {
              errors.password &&
              errors.password.type === 'maxLength' &&
                <span role="alert">Max length exceeded</span>
            }
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
                    id="isAdmin"
                    name="isAdmin"
                    className="auth-form__isAdmin-checkbox"
                    ref={register}
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
