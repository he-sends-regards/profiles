import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {useHttp} from '../../hooks/http.hook';
import {APIRoute} from '../../const';
import PropTypes from 'prop-types';
import {getAge} from '../../utils';

const Dashboard = ({isActive = false, dashData = []}) => {
  const {request} = useHttp();
  const [dash, setDash] = useState(dashData);

  const getDash = async () => {
    setDash(await request(APIRoute.DASHBOARD));
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
