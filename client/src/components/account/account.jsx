import React, {useContext, useState} from 'react';
import {Nav, Tab, Row, Col, Button} from 'react-bootstrap';
import {AuthContext} from '../../context/AuthContext';
import ProfilesList from '../profiles-list/profiles-list';
import UsersList from '../users-list/users-list';
import './account.css';

const MenuItems = [
  {
    id: 'MyProfiles',
    name: 'My profiles',
  },
  {
    id: 'ProfilesNetwork',
    name: 'Profiles network',
  },
  {
    id: 'UsersNetwork',
    name: 'Users network',
  },
  {
    id: 'Dashboard',
    name: 'Dashboard',
  },
];

const Account = () => {
  const auth = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('MyProfiles');

  return (
    <div className="account">
      <Tab.Container id="left-tabs-example" defaultActiveKey="MyProfiles">
        <Row className="mx-0">
          <Col sm={2}>
            <Nav variant="pills" className="flex-column text-center">
              <h3>
                <img
                  src="https://www.flaticon.com/svg/vstatic/svg/61/61205.svg?token=exp=1614162945~hmac=6066da504f43d54182f04003a23f65d0"
                  alt="Account logo"
                  width="30px"
                  style={{filter: 'invert()'}}
                />
                <br/>
                {auth.userName}
              </h3>

              <br/>
              {
                MenuItems.map((menuItem) => {
                  if (!auth.isUserAdmin && menuItem.id !== 'MyProfiles') {
                    return;
                  }
                  return (
                    <Nav.Item key={`${menuItem.id}-menu-item`}>
                      <Nav.Link
                        eventKey={menuItem.id}
                        onClick={() => setActiveTab(menuItem.id)}
                        disabled={activeTab === menuItem.id}
                      >
                        {menuItem.name}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })
              }
              <br/>

              <Button variant="outline-danger"
                className="account__logout-btn"
                onClick={() => auth.logout()}>
                Logout
              </Button>
            </Nav>
          </Col>

          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="MyProfiles">
                <ProfilesList
                  isActive={activeTab === 'MyProfiles'}
                />
              </Tab.Pane>
              {
                auth.isUserAdmin &&
                  (
                    <>
                      <Tab.Pane eventKey="ProfilesNetwork">
                        <ProfilesList
                          isActive={activeTab === 'ProfilesNetwork'}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="UsersNetwork">
                        <UsersList
                          isActive={activeTab === 'UsersNetwork'}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="Dashboard">
                        <h3>1</h3>
                      </Tab.Pane>
                    </>
                  )
              }
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Account;
