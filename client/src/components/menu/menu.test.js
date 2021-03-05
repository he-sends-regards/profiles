import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import Menu from './menu.jsx';

const mockName = 'John';
const defaultName = 'Unknown';

const getMenuItems = () => screen.getAllByRole('button');

describe('Menu renders correctly with props', () => {
  it('Should render correctly without props', () => {
    render(<Menu />);

    expect(screen.getByRole('heading').textContent).toBe(defaultName);
    expect(getMenuItems().length).toBe(2);
  });

  it('Should render correct userName', () => {
    render(<Menu userData={{userName: mockName}} />);

    expect(screen.getByRole('heading').textContent).toBe(mockName);
    expect(getMenuItems().length).toBe(2);
  });

  it('Should contains 2 menu items when user is not an admin', () => {
    render(<Menu userData={{userName: mockName, isUserAdmin: false}} />);

    expect(getMenuItems().length).toBe(2);
  });

  it('Should contains 5 menu items when isAdmin-prop is true', () => {
    render(<Menu userData={{isUserAdmin: true}} />);

    expect(getMenuItems().length).toBe(5);
  });

  it('Logout btn should be clickable', () => {
    render(<Menu />);
    const logoutBtnComponent = screen.getByText('Logout');

    expect(logoutBtnComponent.disabled).toBe(false);
    expect(fireEvent.click(screen.getByText('Logout'))).toBe(true);
  });
});
