import React from 'react'; ;
import {screen, render} from '@testing-library/react';
import UsersList from './users-list.jsx';
import {UsersMockProps} from '../../mocks/users.js';

const setUp = (props=UsersMockProps) => render(<UsersList {...props} />);

describe('Users list tests', () => {
  it('Users list should render correctly', () => {
    setUp();
    expect(screen.getByTestId('users-list')).toBeTruthy();
    expect(screen.getAllByTestId('user-card').length).toBe(2);
  });
});
