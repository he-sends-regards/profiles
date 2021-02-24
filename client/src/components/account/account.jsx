import React, {useContext} from 'react';
import {Nav, Tab, Row, Col, Button} from 'react-bootstrap';
import {AuthContext} from '../../context/AuthContext';
import './account.css';

const Account = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="account">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="mx-0">
          <Col sm={2}>
            <Nav variant="pills" className="flex-column text-center">
              <Nav.Item>
                <Nav.Link eventKey="MyProfiles">My profiles</Nav.Link>
              </Nav.Item>
              {
                auth.isUserAdmin &&
                  (
                    <>
                      <Nav.Item>
                        <Nav.Link eventKey="ProfilesWeb">Profiles web</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="Dashboard">Dashboard</Nav.Link>
                      </Nav.Item>
                    </>
                  )
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
                <h3>1</h3>
              </Tab.Pane>
              {
                auth.isUserAdmin &&
                  (
                    <>
                      <Tab.Pane eventKey="ProfilesWeb">
                        <h3>1</h3>
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
