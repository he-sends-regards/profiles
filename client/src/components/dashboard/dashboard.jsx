import React, {useEffect, useState} from 'react';
import {useHttp} from '../../hooks/http.hook';
import {APIRoute} from '../../const';
import PropTypes from 'prop-types';

const getAge = (DOB) => {
  const today = new Date();
  const birthDate = new Date(DOB);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const Dashboard = ({isActive}) => {
  const {request} = useHttp();
  const [dash, setDash] = useState([]);

  const getDash = async () => {
    setDash(await request(
        `${APIRoute.GET_USERS}/usersCount`,
    ));
  };

  useEffect(() => {
    getDash();
  }, [isActive]);

  return dash.length !== 0 && (
    <div className="dashboard">
      <ul>
        <li>Всего пользователей: {dash.usersCount}</li>
        <li>Всего профилей: {dash.profilesCount}</li>
        <li>
          Профилей старше 18 лет: {
            dash.profiles
                .map((profile) => new Date(profile.birthdate))
                .filter((profileDate) => getAge(profileDate) > 18)
                .length
          }
        </li>
      </ul>
    </div>
  );
};

Dashboard.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Dashboard;
