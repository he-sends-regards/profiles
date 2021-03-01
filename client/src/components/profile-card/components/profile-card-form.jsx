import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import cancelSvg from './img/cancel.svg';
import {useForm} from 'react-hook-form';
import {APIRoute, HTTPStatus, ProfileFormType} from '../../../const';
import {AuthContext} from '../../../context/AuthContext';
import {useHttp} from '../../../hooks/http.hook';
import './profile-card-form.css';

const ProfileCardForm = ({
  setIsCardCreating,
  setIsCardEditing,
  setIsProfileDataChanged,
  type,
  profile,
}) => {
  const {userMail} = useContext(AuthContext);
  const {request} = useHttp();
  const {register, handleSubmit, errors} = useForm();

  const onSumbit = async (authData) => {
    const data = type === ProfileFormType.CREATE ?
      await request(
          `${APIRoute.GET_PROFILES}/add`,
          'POST',
          Object.assign({}, authData, {owner: userMail}),
      ) :
      await request(
          `${APIRoute.GET_PROFILES}/update/${profile._id}`,
          'PUT',
          Object.assign({}, authData, {owner: userMail}),
      );

    if (data.status === HTTPStatus.OK) {
      setIsProfileDataChanged(true);
      type === ProfileFormType.CREATE ?
        setIsCardCreating(false) :
        setIsCardEditing(false);
    }
  };

  const onFormClose = () => {
    if (type === ProfileFormType.CREATE) {
      setIsCardCreating(false);
    } else if (type === ProfileFormType.EDIT) {
      setIsCardEditing(false);
    } else {
      console.error(`Unknown type in form: ${type}`);
    }
  };

  return (
    <form className="user-card-edit" onSubmit={handleSubmit(onSumbit)}>
      <div className="user-card-edit__close-container">
        <button
          className="user-card-edit__close_btn"
          onClick={onFormClose}>
          <img
            src={cancelSvg}
            className="user-card-edit__close-img"
            alt="Close creation of the new profile"
          />
        </button>
      </div>
      <div>
        <label htmlFor="name-field">Name:</label>
        <input
          type="name"
          name="name"
          defaultValue={profile ? profile.name : ''}
          id="name-field"
          ref={register({required: true, minLength: 2})}
        />
        <br/>
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
      </div>
      <br />
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          defaultValue={profile ? profile.gender : ''}
          name="gender"
          id="gender"
          ref={register({required: true})}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <br />

      <div>
        <label htmlFor="email-field">Birthdate: </label>
        <input
          type="date"
          name="birthdate"
          ref={register({required: true})}
          defaultValue={profile ? profile.birthdate : ''}
        />
        <br/>
        {
          errors.birthdate &&
          errors.birthdate.type === 'required' &&
            <span role="alert">This is required</span>
        }
      </div>
      <br />
      <div>
        <label htmlFor="city-field">City: </label>
        <input
          type="text"
          name="city"
          id="city-field"
          ref={register({required: true})}
          defaultValue={profile ? profile.city : ''}
        />
        <br/>
        {
          errors.city &&
          errors.city.type === 'required' &&
            <span role="alert">This is required</span>
        }
        <br />
      </div>

      <div className="submit-btn">
        <Button variant="success" type="submit">
          {
            type === ProfileFormType.CREATE ?
              'Create' :
              'Confirm'
          }
        </Button>
      </div>
    </form>
  );
};

ProfileCardForm.propTypes = {
  setIsCardCreating: PropTypes.func.isRequired,
  setIsCardEditing: PropTypes.func,
  setIsProfileDataChanged: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    ProfileFormType.CREATE, ProfileFormType.EDIT,
  ]).isRequired,
  profile: PropTypes.object,
};

export default ProfileCardForm;
