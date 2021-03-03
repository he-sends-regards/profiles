import React from 'react';
import {Button} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
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

const AuthForm = ({formType, onSubmit}) => {
  const {register, handleSubmit, errors} = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
      {
        formType === AuthorizationType.REGISTER && (
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
        data-testid="password-field"
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
        formType === AuthorizationType.REGISTER && (
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
        {formType}
      </Button>
    </form>
  );
};

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(['login', 'register']).isRequired,
};

export default AuthForm;
