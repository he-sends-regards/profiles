import React, {useState} from 'react';
import {Tab, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Dashboard from '../dashboard/dashboard';
import Profiles from '../profiles/profiles';
import Users from '../users/users';
import {MenuItem} from '../../const';
import './account.css';
import Menu from '../menu/menu';

const Account = ({userData}) => {
  const {isUserAdmin} = userData;
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="account" data-testid="account">
      <Tab.Container id="left-tabs-example">
        <Row className="mx-0">
          <Col sm={2}>
            <Menu
              setActiveTab={setActiveTab}
              userData={userData}
              activeTab={activeTab}
            />
          </Col>

          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane
                eventKey={MenuItem.MY_PROFILES.id}
                data-testid="menu-content"
              >
                <Profiles
                  isActive={activeTab === MenuItem.MY_PROFILES.id}
                  listType={MenuItem.MY_PROFILES.id}
                />
              </Tab.Pane>
              {
                isUserAdmin &&
                  (
                    <div>
                      <Tab.Pane
                        data-testid="menu-content"
                        eventKey={MenuItem.PROFILES_NETWORK.id}
                      >
                        <Profiles
                          isActive={activeTab === MenuItem.PROFILES_NETWORK.id}
                          listType={MenuItem.PROFILES_NETWORK.id}
                        />
                      </Tab.Pane>
                      <Tab.Pane
                        data-testid="menu-content"
                        eventKey={MenuItem.USERS_NETWORK.id}
                      >
                        <Users
                          isActive={activeTab === MenuItem.USERS_NETWORK.id}
                        />
                      </Tab.Pane>
                      <Tab.Pane
                        data-testid="menu-content"
                        eventKey={MenuItem.DASHBOARD.id}
                      >
                        <Dashboard
                          isActive={activeTab === MenuItem.DASHBOARD.id}
                        />
                      </Tab.Pane>
                    </div>
                  )
              }
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

Account.propTypes = {
  userData: PropTypes.shape({
    isUserAdmin: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Account;
