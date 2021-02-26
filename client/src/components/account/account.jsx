import React, {useContext, useState} from 'react';
import {Nav, Tab, Row, Col, Button} from 'react-bootstrap';
import {AuthContext} from '../../context/AuthContext';
import Dashboard from '../dashboard/dashboard';
import ProfilesList from '../profiles-list/profiles-list';
import UsersList from '../users-list/users-list';
import {MenuItem} from '../../const';
import './account.css';
import accSvg from './img/account-logo.svg';
import kingSvg from './img/king-logo.svg';

const Account = () => {
  const auth = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="account">
      <Tab.Container id="left-tabs-example">
        <Row className="mx-0">
          <Col sm={2}>
            <Nav variant="pills" className="flex-column text-center">
              <h3>
                <img
                  src={
                    auth.isUserAdmin ?
                      kingSvg :
                      accSvg
                  }
                  alt="Account logo"
                  width="40px"
                  style={{filter: !auth.isUserAdmin && 'invert()'}}
                />
                <br/>
                {auth.userName}
              </h3>

              <br/>
              {
                Object.values(MenuItem).map((menuItem) => {
                  if (!auth.isUserAdmin && menuItem.id !== MenuItem) {
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
              <Tab.Pane eventKey={MenuItem.MY_PROFILES}>
                <ProfilesList
                  isActive={activeTab === MenuItem.MY_PROFILES}
                  listType={MenuItem.MY_PROFILES}
                />
              </Tab.Pane>
              {
                auth.isUserAdmin &&
                  (
                    <>
                      <Tab.Pane eventKey="ProfilesNetwork">
                        <ProfilesList
                          isActive={activeTab === 'ProfilesNetwork'}
                          listType={'ProfilesNetwork'}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="UsersNetwork">
                        <UsersList
                          isActive={activeTab === 'UsersNetwork'}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="Dashboard">
                        <Dashboard
                          isActive={activeTab === 'Dashboard'}
                        />
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
