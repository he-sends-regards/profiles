import React from 'react';
import {screen, render} from '@testing-library/react';

import Dashboard from './dashboard.jsx';

const setUp = (props) => render(<Dashboard {...props} />);

const mockDashData = {
  usersCount: 10,
  profilesCount: 20,
  profiles: [
    {
      birthdate: '2020-01-01',
    },
    {
      birthdate: '2000-01-01',
    },
    {
      birthdate: '2002-03-04',
    },
  ],
};

describe('Dashboard tests', () => {
  it('Should render correctly', () => {
    setUp({
      isActive: true,
      dashData: mockDashData,
    });
    expect(screen.getByTestId('dashboard')).toBeTruthy();
  });
});
