import React, {useEffect, useState, useContext} from 'react';
import {Table} from 'react-bootstrap';
import {AuthContext} from '../../context/AuthContext';
import {useHttp} from '../../hooks/http.hook';
import {APIRoute} from '../../const';
import PropTypes from 'prop-types';
import {getAge} from '../../utils';

const Dashboard = ({isActive = false, dashData = []}) => {
  const {token} = useContext(AuthContext);
  const {request} = useHttp();
  const [dash, setDash] = useState(dashData);

  const getDash = async () => {
    const dashboardData = await request(
        APIRoute.DASHBOARD,
        'GET',
        null,
        {userToken: token},
    );
    if (dashboardData.usersCount &&
      dashboardData.profilesCount &&
      dashboardData.profiles) {
      setDash(dashboardData);
    }
  };

  useEffect(() => {
    if (isActive) {
      getDash();
    }
  }, [isActive]);

  return dash.length !== 0 && (
    <Table
      striped
      bordered
      hover
      variant="dark"
      data-testid="dashboard"
    >
      <thead>
        <tr>
          <th>Total amount of users</th>
          <th>Total amount of profiles</th>
          <th>Amount of adult users</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{dash.usersCount}</td>
          <td>{dash.profilesCount}</td>
          <td>{
            dash.profiles
                .map((profile) => new Date(profile.birthdate))
                .filter((profileDate) => getAge(profileDate) > 18)
                .length
          }</td>
        </tr>
      </tbody>
    </Table>
  );
};

Dashboard.propTypes = {
  isActive: PropTypes.bool,
  dashData: PropTypes.shape({
    usersCount: PropTypes.number,
    profilesCount: PropTypes.number,
    profiles: PropTypes.arrayOf(PropTypes.shape({
      birthdate: PropTypes.string,
    })),
  }),
};

export default Dashboard;
