import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import ProfileCard from '../profile-card/profile-card';
import ProfileCardEdit from '../profile-card/components/profile-card-edit';
import {MenuItem, ProfileFormType} from '../../const';
import './profiles-list.css';

const ProfilesList = ({
  profiles,
  listType,
  onAddProfileClick,
  setIsProfileDataChanged,
  isCardCreating,
  setIsCardCreating,
  activeCardForm,
  setActiveCardForm,
}) => {
  return (
    <div className="profiles-list">
      {
        !profiles.message && profiles.map((profile, i) => {
          i += 1;
          return (
            <ProfileCard
              key={`profile-card-${profile._id}`}
              data-testid='profile-card'
              profile={profile}
              index={i}
              setIsProfileDataChanged={setIsProfileDataChanged}
              setIsCardCreating={setIsCardCreating}
              isCardCreating={isCardCreating}
              listType={listType}
              activeCardForm={activeCardForm}
              setActiveCardForm={setActiveCardForm}
            />
          );
        })
      }
      {
        listType === MenuItem.MY_PROFILES.id && (isCardCreating ? (
          <ProfileCardEdit
            setIsProfileDataChanged={setIsProfileDataChanged}
            setIsCardCreating={setIsCardCreating}
            type={ProfileFormType.CREATE}
          />
        ) : (
          <div className="profiles-list__card">
            <Button className="profiles-card__btn"
              onClick={onAddProfileClick}
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
  profiles: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    owner: PropTypes.string,
    birthdate: PropTypes.string,
    gender: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
  })),
  listType: PropTypes.oneOf(
      [MenuItem.MY_PROFILES.id, MenuItem.PROFILES_NETWORK.id],
  ).isRequired,
  onAddProfileClick: PropTypes.func,
  isCardCreating: PropTypes.bool,
  setIsProfileDataChanged: PropTypes.func,
  setIsCardCreating: PropTypes.func,
  activeCardForm: PropTypes.string,
  setActiveCardForm: PropTypes.func,
};

export default ProfilesList;
