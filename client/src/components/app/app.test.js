import React from 'react';
import {screen, render} from '@testing-library/react';

import App from './app.jsx';

const setUp = (props) => render(<App {...props} />);
const noop = () => {};

describe('App component tests', () => {
  it('Should render correctly', () => {
    setUp();
    expect(screen.getByTestId('auth-form')).toBeTruthy();
  });

  it('Should render correctly with mock data', () => {
    const mockAppData = {
      login: noop,
      logout: noop,
      token: 'token',
      userId: 'userId',
      userName: 'userName',
      userMail: 'userMail',
      isAuthenticated: true,
      isUserAdmin: false,
    };

    render(<App appData={mockAppData} />);

    expect(screen.getByTestId('account')).toBeTruthy();
  });

  it('Should render correctly with mock data + user is an admin', () => {
    const mockAppData = {
      login: noop,
      logout: noop,
      token: 'token',
      userId: 'userId',
      userName: 'userName',
      userMail: 'userMail',
      isAuthenticated: true,
      isUserAdmin: true,
    };

    render(<App appData={mockAppData} />);

    expect(screen.getByTestId('account')).toBeTruthy();
    expect(screen.getAllByTestId('menu-content').length).toBe(4);
  });
});
