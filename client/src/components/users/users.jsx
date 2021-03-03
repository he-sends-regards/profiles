import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useHttp} from '../../hooks/http.hook';
import {APIRoute} from '../../const';
import UsersList from './users-list';
import './users-list.css';

const Users = ({isActive}) => {
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

  return isActive && (
    <UsersList users={users} setIsUserDataChanged={setIsUserDataChanged} />
  );
};

Users.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Users;
