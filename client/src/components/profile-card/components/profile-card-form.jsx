import React, {useContext, createRef} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import cancelSvg from './img/cancel.svg';
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
  listType,
}) => {
  const {userMail} = useContext(AuthContext);
  const {request} = useHttp();

  const nameRef = createRef();
  const calendarRef = createRef();
  const genderRef = createRef();
  const cityRef = createRef();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const newProfileData = listType === 'ProfilesNetwork' ? {
      birthdate: calendarRef.current.value,
      gender: genderRef.current.value,
      name: nameRef.current.value,
      city: cityRef.current.value,
    } : {
      owner: userMail,
      birthdate: calendarRef.current.value,
      gender: genderRef.current.value,
      name: nameRef.current.value,
      city: cityRef.current.value,
    };

    const data = type === ProfileFormType.CREATE ?
      await request(
          `${APIRoute.GET_PROFILES}/add`,
          'POST',
          newProfileData,
      ) :
      await request(
          `${APIRoute.GET_PROFILES}/update/${profile._id}`,
          'PUT',
          newProfileData,
      );

    if (data.status === HTTPStatus.OK) {
      setIsProfileDataChanged(true);
      type === ProfileFormType.CREATE ?
        setIsCardCreating(false) :
        setIsCardEditing(false);
    }
  };

  return (
    <form className="user-card-edit" onSubmit={handleSubmit}>
      <div className="user-card-edit__close-container">
        <button
          className="user-card-edit__close_btn"
          onClick={() => {
            if (type === ProfileFormType.CREATE) {
              setIsCardCreating(false);
            } else if (type === ProfileFormType.EDIT) {
              setIsCardEditing(false);
            } else {
              console.error(`Unknown type in form: ${type}`);
            }
          }}>
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
          minLength="2"
          type="name"
          defaultValue={profile ? profile.name : ''}
          id="name-field"
          ref={nameRef}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          defaultValue={profile ? profile.gender : ''}
          name="gender"
          id="gender"
          required
          ref={genderRef}
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
          name="calendar"
          ref={calendarRef}
          required
          defaultValue={profile ? profile.birthdate : ''}
        />
      </div>
      <br />
      <div>
        <label htmlFor="city-field">City: </label>
        <input
          type="text"
          id="city-field"
          required
          ref={cityRef}
          defaultValue={profile ? profile.city : ''}
        />
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
  setIsCardEditing: PropTypes.func.isRequired,
  setIsProfileDataChanged: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['edit', 'create']).isRequired,
  profile: PropTypes.object,
  listType: PropTypes.oneOf(['MyProfiles', 'ProfilesNetwork']),
};

export default ProfileCardForm;
