import React, {useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useHttp} from '../../hooks/http.hook';
import {ButtonGroup, Button} from 'react-bootstrap';
import {APIRoute} from '../../const';
import './auth-page.css';
import AuthForm from '../auth-form/auth-form';

const AuthorizationType = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const AuthPage = () => {
  const auth = useContext(AuthContext);

  const [formType, setFormType] = useState('');
  const {request} = useHttp();

  const onSubmit = async (authData) => {
    const responseData = await request(
        `${APIRoute.AUTH}/${formType}`,
        'POST',
        authData,
    );

    if (formType === AuthorizationType.LOGIN) {
      auth.login(
          responseData.token,
          responseData.userId,
          responseData.userName,
          responseData.userMail,
          responseData.isUserAdmin,
      );
    }

    if (formType === AuthorizationType.REGISTER &&
      responseData.status !== 400) {
      alert('You have been registered!');
      setFormType(AuthorizationType.LOGIN);
    }
  };

  const onFormTypeBtnClick = (formType) => setFormType(formType);

  return (
    <div className="auth-form" data-testid="auth-form">
      <ButtonGroup aria-label="Basic example"
        className="auth-form__auth-buttons"
      >
        <Button variant="primary"
          onClick={() => onFormTypeBtnClick(AuthorizationType.LOGIN)}
          disabled={formType === AuthorizationType.LOGIN}
        >
          Login
        </Button>
        <Button variant="warning"
          onClick={() => onFormTypeBtnClick(AuthorizationType.REGISTER)}
          disabled={formType === AuthorizationType.REGISTER}
        >
          Register
        </Button>
      </ButtonGroup>

      {
        formType && <AuthForm
          onSubmit={onSubmit}
          formType={formType}
        />
      }
    </div>
  );
};

export default AuthPage;
