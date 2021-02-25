import React, {useEffect, useState, useContext} from 'react';
import {useHttp} from '../../hooks/http.hook';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProfileCard from '../profile-card/profile-card';
import {AuthContext} from '../../context/AuthContext';
import {APIRoute} from '../../const';

const ProfilesList = ({isActive, listType}) => {
  const {userMail} = useContext(AuthContext);
  const [editingCard, setCardEditing] = useState(-1);
  const [profiles, setProfiles] = useState([]);
  const [isProfileDeleted, setIsProfileDeleted] = useState(false);
  const {request} = useHttp();

  const getProfiles = async () => {
    setProfiles(await request(
      listType === 'ProfilesNetwork' ?
        APIRoute.GET_PROFILES :
        `${APIRoute.GET_PROFILES}/${userMail}`,
    ));
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
  listType: PropTypes.oneOf(['MyProfiles', 'ProfilesNetwork']).isRequired,
};

export default ProfilesList;
