import React from 'react';
import PropTypes from 'prop-types';
import UserCard from '../user-card/user-сard';
import './users-list.css';

const UsersList = ({users, setIsUserDataChanged}) => {
  return (
    <div className="users-list" data-testid="users-list">
      {
        users.map((user, i) => {
          i += 1;
          return (
            <UserCard
              key={`user-card-${user._id}`}
              user={user}
              setIsUserDataChanged={setIsUserDataChanged}
            />
          );
        })
      }
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  })).isRequired,
  setIsUserDataChanged: PropTypes.func.isRequired,
};

export default UsersList;
