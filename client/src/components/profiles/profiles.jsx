import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../../context/AuthContext';
import {useHttp} from '../../hooks/http.hook';
import {APIRoute, MenuItem} from '../../const';
import './profiles-list.css';
import ProfilesList from './profiles-list';

const Profiles = ({isActive, listType}) => {
  const [profiles, setProfiles] = useState([]);
  const [isProfileDataChanged, setIsProfileDataChanged] = useState(false);
  const [isCardCreating, setIsCardCreating] = useState(false);
  const [activeCardForm, setActiveCardForm] = useState(null);

  const {userMail, token} = useContext(AuthContext);
  const {request} = useHttp();

  const onAddProfileClick = () => {
    setActiveCardForm(null);
    setIsCardCreating(true);
  };

  const getProfiles = async () => {
    const profilesData = await request(
      listType === MenuItem.PROFILES_NETWORK.id ?
        APIRoute.GET_PROFILES :
        `${APIRoute.GET_PROFILES}/${userMail}`,
      'GET',
      null,
      {userToken: token},
    );
    if (profilesData instanceof Array && profilesData.length !== 0) {
      setProfiles(profilesData);
    }
  };

  useEffect(() => {
    isActive && getProfiles();
    isProfileDataChanged && setIsProfileDataChanged(false);
  }, [isActive, isProfileDataChanged]);

  return isActive && (
    <ProfilesList
      profiles={profiles}
      listType={listType}
      onAddProfileClick={onAddProfileClick}
      setIsProfileDataChanged={setIsProfileDataChanged}
      isCardCreating={isCardCreating}
      setIsCardCreating={setIsCardCreating}
      activeCardForm={activeCardForm}
      setActiveCardForm={setActiveCardForm}
    />
  );
};

Profiles.propTypes = {
  isActive: PropTypes.bool.isRequired,
  listType: PropTypes.oneOf(
      [MenuItem.MY_PROFILES.id, MenuItem.PROFILES_NETWORK.id],
  ).isRequired,
  profilesData: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    owner: PropTypes.string,
    birthdate: PropTypes.string,
    gender: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
  })),
};

export default Profiles;
