import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import ProfileCard from '../profile-card/profile-card';
import ProfileCardForm from '../profile-card/components/profile-card-form';
import {AuthContext} from '../../context/AuthContext';
import {useHttp} from '../../hooks/http.hook';
import {APIRoute, MenuItem, ProfileFormType} from '../../const';
import './profiles-list.css';

const ProfilesList = ({isActive, listType}) => {
  const [profiles, setProfiles] = useState([]);
  const [isProfileDataChanged, setIsProfileDataChanged] = useState(false);
  const [isCardCreating, setIsCardCreating] = useState(false);

  const {userMail} = useContext(AuthContext);
  const {request} = useHttp();

  const getProfiles = async () => {
    setProfiles(await request(
      listType === MenuItem.PROFILES_NETWORK.id ?
        APIRoute.GET_PROFILES :
        `${APIRoute.GET_PROFILES}/${userMail}`,
    ));
  };

  useEffect(() => {
    isActive && getProfiles();
    isProfileDataChanged && setIsProfileDataChanged(false);
  }, [isActive, isProfileDataChanged]);

  return (
    <div className="profiles-list">
      {
        profiles.map((profile, i) => {
          i += 1;
          return (
            <ProfileCard
              key={`profile-card-${profile._id}`}
              profile={profile}
              index={i}
              setIsProfileDataChanged={setIsProfileDataChanged}
              setIsCardCreating={setIsCardCreating}
              isCardCreating={isCardCreating}
              listType={listType}
            />
          );
        })
      }
      {
        listType === MenuItem.MY_PROFILES.id && (isCardCreating ? (
          <ProfileCardForm
            setIsProfileDataChanged={setIsProfileDataChanged}
            setIsCardCreating={setIsCardCreating}
            type={ProfileFormType.CREATE}
          />
        ) : (
          <div style={{
            width: '200px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Button style={{
              width: '30%',
              height: '30%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => {
              setIsCardCreating(true);
            }}
            size="lg"
            >+</Button>
          </div>
        )
        )
      }
    </div>
  );
};

ProfilesList.propTypes = {
  isActive: PropTypes.bool.isRequired,
  listType: PropTypes.oneOf(
      [MenuItem.MY_PROFILES.id, MenuItem.PROFILES_NETWORK.id],
  ).isRequired,
};

export default ProfilesList;
