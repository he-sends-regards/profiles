import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import moment from 'moment';
import cancelSvg from './img/cancel.svg';
import {useForm} from 'react-hook-form';
import {ProfileFormType} from '../../../const';
import './profile-card-form.css';

const ProfileCardForm = ({
  onSubmit,
  onFormClose,
  type,
  profile,
}) => {
  const {register, handleSubmit, errors} = useForm();

  return (
    <form
      className="profile-card-edit"
      data-testid="profile-card-edit"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="profile-card-edit__close-container">
        <button
          className="profile-card-edit__close_btn"
        >
          <img
            src={cancelSvg}
            className="profile-card-edit__close-img"
            onClick={onFormClose}
            data-testid="profile-card-edit__close-img"
            alt="Close creation of the new profile"
          />
        </button>
      </div>
      <div>
        <label htmlFor="name-field">Name:</label>
        <input
          type="name"
          name="name"
          data-testid="name-field"
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
          ref={register()}
          defaultValue={
            profile ?
              profile.birthdate :
              moment().format('YYYY-MM-DD')
          }/>
        <br/>
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
  type: PropTypes.oneOf([
    ProfileFormType.CREATE, ProfileFormType.EDIT,
  ]).isRequired,
  profile: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
};

export default ProfileCardForm;
