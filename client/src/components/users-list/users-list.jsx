import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useHttp} from '../../hooks/http.hook';
import UserCard from '../user-card/user-сard';
import {APIRoute} from '../../const';

const UsersList = ({isActive}) => {
  const [users, setUsers] = useState([]);
  const [editingCard, setCardEditing] = useState(-1);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const {request} = useHttp();

  const getUsers = async () => {
    setUsers(await request(
        APIRoute.GET_USERS,
    ));
  };

  useEffect(() => {
    if (isActive) {
      getUsers();
    }
    setIsUserDeleted(false);
  }, [isActive, isUserDeleted]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}>
      {
        users.map((user, i) => {
          i += 1;
          return (
            <UserCard
              key={`user-card-${user._id}`}
              user={user}
              editingCard={editingCard}
              setCardEditing={setCardEditing}
              isUserDeleted={isUserDeleted}
              setIsUserDeleted={setIsUserDeleted}
            />
          );
        })
      }
    </div>
  );
};

UsersList.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default UsersList;
