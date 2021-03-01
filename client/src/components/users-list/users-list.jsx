import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useHttp} from '../../hooks/http.hook';
import UserCard from '../user-card/user-сard';
import {APIRoute} from '../../const';
import './users-list.css';

const UsersList = ({isActive}) => {
  const [users, setUsers] = useState([]);
  const [isUserDataChanged, setIsUserDataChanged] = useState(false);
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
    if (isUserDataChanged) {
      setIsUserDataChanged(false);
    }
  }, [isActive, isUserDataChanged]);

  return (
    <div className="users-list">
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
  isActive: PropTypes.bool.isRequired,
};

export default UsersList;
