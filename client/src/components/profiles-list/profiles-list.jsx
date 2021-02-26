import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import ProfileCard from '../profile-card/profile-card';
import ProfileCardForm from '../profile-card/components/profile-card-form';
import {AuthContext} from '../../context/AuthContext';
import {useHttp} from '../../hooks/http.hook';
import {APIRoute} from '../../const';

const ProfilesList = ({isActive, listType}) => {
  const [profiles, setProfiles] = useState([]);
  const [editingCard, setCardEditing] = useState('');
  const [isProfileDataChanged, setIsProfileDataChanged] = useState(false);
  const [isCardCreating, setIsCardCreating] = useState(false);

  const {userMail} = useContext(AuthContext);
  const {request} = useHttp();

  const getProfiles = async () => {
    setProfiles(await request(
      listType === 'ProfilesNetwork' ?
        APIRoute.GET_PROFILES :
        `${APIRoute.GET_PROFILES}/${userMail}`,
    ));
  };

  useEffect(() => {
    isActive && getProfiles();
    isProfileDataChanged && setIsProfileDataChanged(false);
  }, [isActive, isProfileDataChanged]);

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
              isCardCreating={isCardCreating}
              setIsCardCreating={setIsCardCreating}
              setIsProfileDataChanged={setIsProfileDataChanged}
            />
          );
        })
      }
      {
        listType === 'MyProfiles' && (isCardCreating && !editingCard ? (
          <ProfileCardForm setIsCardCreating={setIsCardCreating}
            setIsProfileDataChanged={setIsProfileDataChanged} />
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
