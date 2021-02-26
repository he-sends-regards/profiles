import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import {useHttp} from '../../hooks/http.hook';
import {APIRoute} from '../../const';
import PropTypes from 'prop-types';
import {getAge} from '../../utils';

const Dashboard = ({isActive}) => {
  const {request} = useHttp();
  const [dash, setDash] = useState([]);

  const getDash = async () => {
    setDash(await request(APIRoute.DASHBOARD));
  };

  useEffect(() => {
    getDash();
  }, [isActive]);

  return dash.length !== 0 && (
    <Table striped bordered hover variant="dark" style={{textAlign: 'center'}}>
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
  isActive: PropTypes.bool.isRequired,
};

export default Dashboard;
