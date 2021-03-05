import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import PropTypes from 'prop-types';
import {useHttp} from '../../hooks/http.hook';
import {APIRoute} from '../../const';
import UsersList from './users-list';
import './users-list.css';

const Users = ({isActive}) => {
  const {token} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isUserDataChanged, setIsUserDataChanged] = useState(false);
  const {request} = useHttp();

  const getUsers = async () => {
    const usersData = await request(
        APIRoute.GET_USERS,
        'GET',
        null,
        {userToken: token},
    );
    if (usersData instanceof Array && usersData.length !== 0) {
      setUsers(usersData);
    }
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
