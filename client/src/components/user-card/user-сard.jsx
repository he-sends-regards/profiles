import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import {AuthContext} from '../../context/AuthContext';
import {useHttp} from '../../hooks/http.hook';
import {APIRoute, HTTPStatus} from '../../const';
import './user-сard.css';

const UserCard = (
    {user, editingCard, setCardEditing, setIsUserDataChanged},
) => {
  const {request} = useHttp();
  const {userMail, logout, isUserAdmin} = useContext(AuthContext);

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
        <Card.Text className="d-flex flex-column">
          <span>
              Is admin: {`${user.isAdmin}`}
          </span>
          {
            !user.isAdmin && (
              <Card.Link style={{
                cursor: 'pointer',
                color: 'green',
              }}
              onClick={async () => {
                const data = await request(
                    `api/users/updateToAdmin/${user.email}`,
                    'PUT',
                );
                console.log(data);
                if (data.status === HTTPStatus.OK) {
                  setIsUserDataChanged(true);
                }
              }}
              >
                update to admin &uarr;
              </Card.Link>
            )
          }
        </Card.Text>
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
                  {isUserAdmin},
              );
              if (data.status === HTTPStatus.OK) {
                if (user.email === userMail) {
                  logout();
                } else {
                  setIsUserDataChanged(true);
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
    isAdmin: PropTypes.bool.isRequired,
  }).isRequired,
  editingCard: PropTypes.number.isRequired,
  setCardEditing: PropTypes.func.isRequired,
  setIsUserDataChanged: PropTypes.func.isRequired,
};

export default UserCard;
