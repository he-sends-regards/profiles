import React, {useContext} from 'react';
import {Nav, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {AuthContext} from '../../context/AuthContext';
import {MenuItem} from '../../const';
import accLogo from './img/account-logo.png';
import kingLogo from './img/king-logo.svg';

const Menu = ({
  setActiveTab,
  userData={userName: 'Unknown', isUserAdmin: false},
  activeTab,
}) => {
  const auth = useContext(AuthContext);
  const {userName, isUserAdmin} = userData;
  const onTabClick = (tabName) => setActiveTab(tabName);
  const onLogout = () => auth.logout();

  return (
    <Nav
      variant="pills"
      className="flex-column text-center account-menu"
    >
      <h3 className="menu__name">
        <img
          src={isUserAdmin ? kingLogo : accLogo}
          alt="Account logo"
          width="40px"
        />
        <br/>
        {userName}
      </h3>

      <br/>
      {
        Object.values(MenuItem).map((menuItem) => {
          if (!isUserAdmin &&
              menuItem.id !== MenuItem.MY_PROFILES.id
          ) return;

          return (
            <Nav.Item key={`${menuItem.id}-menu-item`}>
              <Nav.Link
                eventKey={menuItem.id}
                onClick={() => onTabClick(menuItem.id)}
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
        onClick={onLogout}>
          Logout
      </Button>
    </Nav>
  );
};

Menu.propTypes = {
  userData: PropTypes.shape({
    isUserAdmin: PropTypes.bool,
    userName: PropTypes.string,
  }),
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
};

export default Menu;
