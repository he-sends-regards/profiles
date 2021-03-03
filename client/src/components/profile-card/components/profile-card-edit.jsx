import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {APIRoute, HTTPStatus, ProfileFormType} from '../../../const';
import {AuthContext} from '../../../context/AuthContext';
import {useHttp} from '../../../hooks/http.hook';
import './profile-card-form.css';
import ProfileCardForm from './profile-card-form';

const ProfileCardEdit = ({
  setIsCardCreating,
  setIsCardEditing,
  setIsProfileDataChanged,
  type,
  profile,
}) => {
  const {userMail} = useContext(AuthContext);
  const {request} = useHttp();

  const onSubmit = async (authData) => {
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
    <ProfileCardForm
      onSubmit={onSubmit}
      onFormClose={onFormClose}
      type={type}
      profile={profile}
    />
  );
};

ProfileCardEdit.propTypes = {
  type: PropTypes.oneOf([
    ProfileFormType.CREATE, ProfileFormType.EDIT,
  ]).isRequired,
  profile: PropTypes.object,
  setIsCardCreating: PropTypes.func.isRequired,
  setIsCardEditing: PropTypes.func,
  setIsProfileDataChanged: PropTypes.func.isRequired,
};

export default ProfileCardEdit;
