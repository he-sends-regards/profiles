import React, {useEffect, useState, useContext} from 'react';
import {useHttp} from '../../hooks/http.hook';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProfileCard from '../profile-card/profile-card';
import {AuthContext} from '../../context/AuthContext';
import {APIRoute} from '../../const';
import ProfileCardEdit from '../profile-card/components/profile-card-edit';

const ProfilesList = ({isActive, listType}) => {
  const {userMail} = useContext(AuthContext);
  const [editingCard, setCardEditing] = useState('');
  const [isCardCreating, setIsCardCreating] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
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
    if (isProfileCreated) {
      setIsProfileCreated(false);
      getProfiles();
    }
    setIsProfileDeleted(false);
  }, [isActive, isProfileDeleted, isProfileCreated]);

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
              isCardCreating={isCardCreating}
              setIsCardCreating={setIsCardCreating}
            />
          );
        })
      }
      {
        listType === 'MyProfiles' && (isCardCreating && !editingCard ? (
          <ProfileCardEdit setIsCardCreating={setIsCardCreating}
            setIsProfileCreated={setIsProfileCreated} />
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
              setCardEditing('');
              setIsCardCreating(!isCardCreating);
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
  listType: PropTypes.oneOf(['MyProfiles', 'ProfilesNetwork']).isRequired,
};

export default ProfilesList;
