import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import ProfileCardEdit from './components/profile-card-edit';
import {useHttp} from '../../hooks/http.hook';
import {AuthContext} from '../../context/AuthContext';
import {HTTPStatus, ProfileFormType} from '../../const';
import './profile-card.css';

const ProfileCard = ({
  profile,
  index,
  setIsProfileDataChanged,
  setIsCardCreating,
  activeCardForm,
  setActiveCardForm,
  isCardCreating,
}) => {
  const {request} = useHttp();
  const {isUserAdmin, token} = useContext(AuthContext);
  const [isCardEditing, setIsCardEditing] = useState(false);

  const onEditClick = () => {
    setIsCardCreating(false);
    setIsCardEditing(true);
    setActiveCardForm(profile._id);
  };

  const onDeleteClick = async () => {
    const data = await request(
        `/api/profiles/delete/${profile._id}`,
        'DELETE',
        {isUserAdmin},
        {userToken: token},
    );
    if (data.status === HTTPStatus.OK) {
      setIsProfileDataChanged(true);
    }
  };

  return (isCardEditing && !isCardCreating) &&
    activeCardForm === profile._id ? (
    <ProfileCardEdit
      profile={profile}
      type={ProfileFormType.EDIT}
      setIsProfileDataChanged={setIsProfileDataChanged}
      setIsCardCreating={setIsCardCreating}
      setIsCardEditing={setIsCardEditing}
    />
  ) : (
    <Card className="profile-card" data-testid="profile-card">
      <Card.Body>
        <Card.Title>Profile #{index}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {profile.name}
        </Card.Subtitle>
        <Card.Text className="d-flex flex-column">
          <span>Gender: {profile.gender}</span>
          <span>
              Birthdate: {profile.birthdate}
          </span>
          <span>City: {profile.city}</span>
        </Card.Text>

        <Card.Link
          className="profile-card__link"
          onClick={onEditClick}
          data-testid="profile-card__edit-btn"
        >
          Edit
        </Card.Link>

        <Card.Link
          className="profile-card__link"
          onClick={onDeleteClick}
        >Delete</Card.Link>
      </Card.Body>
    </Card>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setIsProfileDataChanged: PropTypes.func.isRequired,
  setIsCardEditing: PropTypes.func,
  setIsCardCreating: PropTypes.func.isRequired,
  isCardCreating: PropTypes.bool.isRequired,
  isCardEditing: PropTypes.bool,
  activeCardForm: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired,
  ]),
  setActiveCardForm: PropTypes.func.isRequired,
};

export default ProfileCard;
