import React, {useContext, createRef} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import cancelSvg from './img/cancel.svg';
import {APIRoute, HTTPStatus} from '../../../const';
import {AuthContext} from '../../../context/AuthContext';
import {useHttp} from '../../../hooks/http.hook';
import './profile-card-form.css';

const ProfileCardForm = ({setIsCardCreating, setIsProfileDataChanged}) => {
  const {userMail} = useContext(AuthContext);
  const {request} = useHttp();

  const nameRef = createRef();
  const calendarRef = createRef();
  const genderRef = createRef();
  const cityRef = createRef();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const data = await request(
        `${APIRoute.GET_PROFILES}/add`,
        'POST',
        {
          owner: userMail,
          birthdate: calendarRef.current.value,
          gender: genderRef.current.value,
          name: nameRef.current.value,
          city: cityRef.current.value,
        },
    );

    if (data.status === HTTPStatus.OK) {
      setIsProfileDataChanged(true);
      setIsCardCreating(false);
    }
  };

  return (
    <form className="user-card-edit" onSubmit={handleSubmit}>
      <div className="user-card-edit__close-container">
        <button
          className="user-card-edit__close_btn"
          onClick={() => setIsCardCreating(false)}>
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
          id="name-field"
          ref={nameRef}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor="gender">Gender:</label>
        <select name="gender" id="gender" required ref={genderRef}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <br />

      <div>
        <label htmlFor="email-field">Birthdate: </label>
        <input type="date" name="calendar" ref={calendarRef} required />
      </div>
      <br />
      <div>
        <label htmlFor="city-field">City: </label>
        <input type="text" id="city-field" required ref={cityRef} />
        <br />
      </div>

      <div className="sumbit-btn">
        <Button variant="success" type="submit">Create</Button>
      </div>
    </form>
  );
};

ProfileCardForm.propTypes = {
  setIsCardCreating: PropTypes.func.isRequired,
  setIsProfileDataChanged: PropTypes.func.isRequired,
};

export default ProfileCardForm;
