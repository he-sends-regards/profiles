import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import {AuthContext} from '../../context/AuthContext';
import {useHttp} from '../../hooks/http.hook';
import {APIRoute} from '../../const';
import './user-сard.css';

const UserCard = ({user,
  editingCard, setCardEditing, isUserDeleted, setIsUserDeleted}) => {
  const {request} = useHttp();
  const {userMail, logout} = useContext(AuthContext);

  return (
    <Card className="user-card"
      style={{
        width: editingCard === user._id ? '420px' : '250px',
        height: editingCard === user._id ? '420px' : '250px',
      }}
    >
      <Card.Body className="user-card_body">
        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {user.email}
        </Card.Subtitle>
        <div>
          {
            editingCard === user._id ?
              (
                <Card.Link style={{cursor: 'pointer'}} onClick={() => {
                  setCardEditing(-1);
                }}>
                  X
                </Card.Link>
              ) :
              (
                <Card.Link style={{cursor: 'pointer'}} onClick={() => {
                  setCardEditing(user._id);
                }}>
                  Edit
                </Card.Link>
              )
          }
          <Card.Link
            style={{
              cursor: 'pointer',
            }}
            onClick={async () => {
              const data = await request(
                  `${APIRoute.DELETE_USER}/${user.email}`,
                  'DELETE',
              );
              if (data.status === 200) {
                if (user.email === userMail) {
                  logout();
                } else {
                  setIsUserDeleted(!isUserDeleted);
                }
              };
            }}
          >Delete</Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  editingCard: PropTypes.number.isRequired,
  setCardEditing: PropTypes.func.isRequired,
  isUserDeleted: PropTypes.bool.isRequired,
  setIsUserDeleted: PropTypes.func.isRequired,
};

export default UserCard;
