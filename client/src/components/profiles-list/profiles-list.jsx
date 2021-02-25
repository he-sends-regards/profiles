import React, {useEffect, useState} from 'react';
import {useHttp} from '../../hooks/http.hook';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProfileCard from '../profile-card/profile-card';
import {APIRoute} from '../../const';

const ProfilesList = ({isActive}) => {
  const [editingCard, setCardEditing] = useState(-1);
  const [profiles, setProfiles] = useState([]);
  const [isProfileDeleted, setIsProfileDeleted] = useState(false);
  const {request} = useHttp();

  const getProfiles = async () => {
    setProfiles(await request(APIRoute.GET_PROFILES));
  };

  useEffect(() => {
    if (isActive) {
      getProfiles();
    }
    setIsProfileDeleted(false);
  }, [isActive, isProfileDeleted]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}>
      {
        profiles.map((profile, i) => {
          i += 1;
          return (
            <ProfileCard
              key={`profile-card-${profile._id}`}
              profile={profile}
              index={i}
              editingCard={editingCard}
              setCardEditing={setCardEditing}
              setIsProfileDeleted={setIsProfileDeleted}
              isProfileDeleted={isProfileDeleted}
            />
          );
        })
      }
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
        size="lg"
        >+</Button>
      </div>
    </div>
  );
};

ProfilesList.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default ProfilesList;
